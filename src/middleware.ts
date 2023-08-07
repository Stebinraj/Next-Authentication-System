import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const isPublicPath = path === '/' || path === '/login' || path === '/verifyemail';

        const token: any = request.cookies.get('token')?.value;

        const verifiedToken: any = jwt.decode(token);

        if (isPublicPath && verifiedToken) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
        }
        if (!isPublicPath && !verifiedToken) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/login',
        '/verifyemail'
    ]
};
