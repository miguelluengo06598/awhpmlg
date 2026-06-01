import { createServiceClient } from './supabaseServer'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-05-27.dahlia',
  })
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aecomi.com'

export function calculateNewExpiryDate(currentDate: string | null): string {
  const base = currentDate ? new Date(currentDate) : new Date()
  const today = new Date()
  const from = base > today ? base : today
  from.setFullYear(from.getFullYear() + 2)
  return from.toISOString().split('T')[0]
}

export async function createRenewalPaymentSession(
  certificateId: string,
  userEmail: string,
  userId: string
): Promise<{ sessionId: string; url: string }> {
  const svc = createServiceClient()
  const { data: cert, error } = await svc
    .from('certificates')
    .select('id, certification_type, certification_code, expiry_date, status, renewal_price, can_renew')
    .eq('id', certificateId)
    .eq('user_id', userId)
    .single()

  if (error || !cert) throw new Error('Certificado no encontrado.')
  if (!cert.can_renew) throw new Error('Este certificado no puede renovarse.')
  if (!['active', 'expired'].includes(cert.status)) throw new Error('El certificado no está en estado renovable.')

  const price: number = cert.renewal_price ?? 299.99

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Renovación Certificación ${cert.certification_type}`,
            description: `Renovación por 2 años — ${cert.certification_code}`,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${APP_URL}/dashboard/client?renewal=success`,
    cancel_url:  `${APP_URL}/dashboard/client?renewal=canceled`,
    metadata: {
      certificateId,
      userId,
      type: 'certificate_renewal',
    },
  })

  return { sessionId: session.id, url: session.url! }
}

export async function processRenewalPayment(
  certificateId: string,
  userId: string,
  stripePaymentId: string
): Promise<void> {
  const svc = createServiceClient()

  const { data: cert, error } = await svc
    .from('certificates')
    .select('expiry_date, renewal_price, renewal_count')
    .eq('id', certificateId)
    .eq('user_id', userId)
    .single()

  if (error || !cert) throw new Error('Certificado no encontrado.')

  const newExpiryDate = calculateNewExpiryDate(cert.expiry_date)

  const { error: updateError } = await svc
    .from('certificates')
    .update({
      expiry_date:     newExpiryDate,
      renewal_count:   (cert.renewal_count ?? 0) + 1,
      last_renewed_at: new Date().toISOString(),
      status:          'active',
    })
    .eq('id', certificateId)

  if (updateError) throw updateError

  const { error: renewalError } = await svc
    .from('certificate_renewals')
    .insert({
      certificate_id:    certificateId,
      user_id:           userId,
      old_expiry_date:   cert.expiry_date ?? new Date().toISOString().split('T')[0],
      new_expiry_date:   newExpiryDate,
      amount:            cert.renewal_price ?? 299.99,
      payment_method:    'stripe',
      stripe_payment_id: stripePaymentId,
      status:            'completed',
    })

  if (renewalError) throw renewalError
}

export async function handleStripeWebhook(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.metadata?.type === 'certificate_renewal') {
        await processRenewalPayment(
          session.metadata.certificateId,
          session.metadata.userId,
          session.payment_intent as string
        )
      }
      break
    }
    case 'payment_intent.payment_failed': {
      const failed = event.data.object as Stripe.PaymentIntent
      console.error('[Stripe] Payment failed:', failed.id)
      break
    }
  }
}
