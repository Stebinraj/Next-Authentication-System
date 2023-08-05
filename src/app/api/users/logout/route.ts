import { NextResponse } from "next/server";

export const GET = () => {
    try {
        const response = NextResponse.json({ message: 'Logout Succcessfull', success: true });
        response.cookies.delete('token');
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
