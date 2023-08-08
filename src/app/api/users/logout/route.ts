import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    try {
        const cookies = request.cookies.getAll();

        const token = request.cookies.get('token')?.name || request.cookies.get('token')?.value

        const response = NextResponse.json({ message: 'Logout Succcessfully'});

        if (!token) {
            for (let i of cookies) {
                response.cookies.delete(i.name);
            }
        } else {
            response.cookies.delete('token');
        }
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
