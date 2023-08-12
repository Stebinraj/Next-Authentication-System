import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const GET = () => {
    try {
        cookies().delete('token');
        return NextResponse.json({ message: 'Logout Succcessfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
