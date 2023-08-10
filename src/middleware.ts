import { NextRequest, NextResponse } from 'next/server';
// const jwt = import('jsonwebtoken');

export const middleware = async (request: NextRequest) => {
    try {
        const path = request.nextUrl.pathname;
        const isPublicPath = path === '/' || path === '/login' ||
            path === '/verifyemail' || path === '/resetpassword' || path === '/updatepassword';

        const token: any = request.cookies.get('token')?.value;

        // const verifiedToken: any = (await jwt).decode(token);

        if (isPublicPath && token) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
        }
        if (!isPublicPath && !token) {
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
        '/verifyemail',
        '/resetpassword',
        '/updatepassword'
    ]
};
