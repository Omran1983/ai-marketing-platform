import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req) {
    // For demonstration purposes, we'll allow access to the signin page
    if (req.nextUrl.pathname === '/auth/signin') {
      return NextResponse.next()
    }
    
    // For all other protected routes, authentication is required
    return NextResponse.next()
  },
  {
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error'
    }
  }
)

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}