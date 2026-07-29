import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { Resend } from 'resend'
import escapeHtml from 'escape-html'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const ADMIN_EMAIL = 'info@aecomi.com'
const FROM_EMAIL = 'noreply@aecomi.es'

function validateContactForm(data: Record<string, unknown>) {
  const errors: string[] = []
  const fullName = data.fullName ?? data.name
  if (!fullName || typeof fullName !== 'string' || !fullName.trim())
    errors.push('Nombre requerido')
  if (!data.email || typeof data.email !== 'string' || !data.email.trim())
    errors.push('Email requerido')
  if (typeof data.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.push('Email inválido')
  if (!data.subject || typeof data.subject !== 'string' || !data.subject.trim())
    errors.push('Asunto requerido')
  if (!data.message || typeof data.message !== 'string' || !data.message.trim())
    errors.push('Mensaje requerido')
  if (typeof data.message === 'string' && data.message.length > 5000)
    errors.push('Mensaje demasiado largo (máx. 5000 caracteres)')
  return { valid: errors.length === 0, errors }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const userAgent = req.headers.get('user-agent') ?? ''

    if (!(await rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000))) {
      return NextResponse.json(
        { success: false, error: 'Demasiadas solicitudes. Inténtalo en una hora.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { valid, errors } = validateContactForm(body)
    if (!valid) {
      return NextResponse.json({ success: false, error: errors[0] }, { status: 400 })
    }

    const name = String(body.fullName ?? body.name).trim().substring(0, 255)
    const email = String(body.email).trim().toLowerCase().substring(0, 255)
    const phone = body.phone ? String(body.phone).trim().substring(0, 20) : null
    const subject = String(body.subject).trim().substring(0, 500)
    const message = String(body.message).trim().substring(0, 5000)

    const { data: saved, error: dbError } = await supabase
      .from('contact_messages')
      .insert({ name, email, phone, subject, message, ip_address: ip, user_agent: userAgent, status: 'new' })
      .select('id')
      .single()

    if (dbError) {
      console.error('[/api/contact] DB error:', dbError.message)
      return NextResponse.json(
        { success: false, error: 'Error guardando el mensaje. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    const refId = saved.id as string

    // Todo el contenido controlado por el usuario se ESCAPA antes de interpolarlo
    // en HTML (previene inyección de HTML/enlaces de phishing en la bandeja del admin).
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = phone ? escapeHtml(phone) : '—'
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Un ÚNICO email, con destinatario FIJO (el admin). Nunca se envía a una
    // dirección proporcionada por el usuario: eso convertía el endpoint en un
    // relé de correo abierto (spam/phishing desde nuestro dominio). El email del
    // remitente va solo en `replyTo`, que no genera ningún envío hacia él.
    const send = await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      // `email` ya pasó una regex que excluye espacios y saltos de línea (\s),
      // por lo que es seguro como cabecera (sin header injection).
      replyTo: email,
      subject: `[Contacto] ${safeSubject}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Teléfono:</strong> ${safePhone}</p>
        <p><strong>Asunto:</strong> ${safeSubject}</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#333">
          ${safeMessage}
        </blockquote>
        <p style="color:#666;font-size:12px">IP: ${escapeHtml(ip)} | Ref: ${refId}</p>
      `,
    })

    if (send.error) {
      // El mensaje ya está guardado en BD; el fallo de email no debe romper la UX.
      console.error('[/api/contact] Resend error:', send.error)
    }

    return NextResponse.json({ success: true, id: refId }, { status: 200 })
  } catch (error) {
    console.error('[/api/contact] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error procesando la solicitud.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: 'Método no permitido.' }, { status: 405 })
}
