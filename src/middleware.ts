import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SessionData, sessionOptions } from './utils/session'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  const path = request.nextUrl.pathname

  if (session.isLoggedIn && !path.startsWith('/todos')) {
    return NextResponse.redirect(new URL('/todos', request.url))
  }

  if (!session.isLoggedIn && path.startsWith('/todos')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  //return NextResponse.next()
  ///return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico))', '/todos/:path*']
}
