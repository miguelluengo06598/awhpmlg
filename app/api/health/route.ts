import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const { error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .limit(1)

    if (error) throw error

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: { database: 'ok', api: 'ok' },
    })
  } catch (error) {
    // El detalle del error (nombres de tabla/columna, esquema) se registra solo
    // en el servidor; la respuesta pública no lo revela.
    console.error('[/api/health] check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
