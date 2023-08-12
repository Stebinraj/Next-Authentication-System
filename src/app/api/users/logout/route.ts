import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    try {
        request.cookies.clear();
        const response = NextResponse.json({ message: 'Logout Succcessfully' });
        response.cookies.set('token', '', { expires: new Date(0) });
        response.cookies.delete('token');
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
