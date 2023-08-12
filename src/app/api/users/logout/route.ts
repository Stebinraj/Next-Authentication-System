import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    try {
        const cookies = request.cookies.getAll();
        const response = NextResponse.json({ message: 'Logout Succcessfully' });
        for (const i of cookies) {
            response.cookies.set(i.name, '', { expires: new Date(0), path: process.env.TOKEN_PATH });
        }
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
