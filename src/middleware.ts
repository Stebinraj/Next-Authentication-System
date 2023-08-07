import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const isPublicPath = path === '/' || path === '/login';
        const token: any = request.cookies.get('token')?.value;

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
        }
        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    } catch (error: any) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/login',
        '/verifyemail'
    ]
}