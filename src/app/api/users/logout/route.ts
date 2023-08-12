import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    try {
        request.cookies.set('token', '');
        return NextResponse.json({ message: 'Logout Succcessfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
