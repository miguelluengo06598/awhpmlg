import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  // 'aecmi-auth' is a hint cookie set on login and cleared on logout.
  // It lets the proxy make instant routing decisions without touching
  // the Supabase JWT (which lives in localStorage, inaccessible server-side).
  const isAuthenticated = req.cookies.has('aecmi-auth')
  const { pathname } = req.nextUrl

  // Logged-in users visiting auth pages get redirected to the dashboard instantly.
  if (isAuthenticated && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard/client', req.url))
  }

  // We intentionally do NOT redirect /dashboard/* to /auth/signin here.
  // If the cookie is absent but a valid Supabase session exists in localStorage,
  // a proxy redirect would log the user out incorrectly.
  // The client-side auth guards in useAuth() handle that case instead.

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/signin', '/auth/signup'],
}
