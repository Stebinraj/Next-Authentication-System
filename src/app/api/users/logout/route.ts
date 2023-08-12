import { NextRequest, NextResponse } from "next/server";

export const POST = (request: NextRequest) => {
    try {
        request.cookies.clear();
        return NextResponse.json({ message: 'Logout Succcessfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
