import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  // 'aecomi-auth' is a hint cookie set on login and cleared on logout.
  // It lets the proxy make instant routing decisions without reading the
  // Supabase JWT (which lives in localStorage, inaccessible server-side).
  const isAuthenticated = req.cookies.has('aecomi-auth')
  const { pathname } = req.nextUrl

  // Authenticated users visiting auth pages → send straight to dashboard
  if (isAuthenticated && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard/client', req.url))
  }

  // Unauthenticated users visiting protected routes → redirect to signin,
  // preserving the intended destination so they land there after login.
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/signin', '/auth/signup', '/dashboard/:path*'],
}
