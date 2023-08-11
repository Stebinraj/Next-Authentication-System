import { NextResponse } from "next/server";

export const GET = () => {
    try {
        const response = NextResponse.json({ message: 'Logout Succcessfully' });
        response.cookies.delete('token');
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
