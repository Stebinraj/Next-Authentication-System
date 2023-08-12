import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
    try {
        const path = request.nextUrl.pathname;

        const isPublicPath = path === '/' || path === '/login' ||
            path === '/verifyemail' || path === '/resetpassword' || path === '/updatepassword';

        try {
            const token: any = request.cookies.get('token')?.value;

            await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));

            if (isPublicPath) {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
            }
        } catch (error: any) {
            if (!isPublicPath) {
                return NextResponse.redirect(new URL('/', request.nextUrl));
            }
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
        '/updatepassword',
        '/api/users/id',
        '/api/users/logout'
    ]
};
