import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    try {
        let a = request.cookies.clear();
        if (!a) {
            throw new Error('ddhdd');
        }
        return NextResponse.json({ message: 'Logout Succcessfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
