import { getIdFromToken } from "@/helpers/getIdFromToken";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const id = await getIdFromToken(request);
        return NextResponse.json({ id: id});
    } catch (error: any) {
        return NextResponse.json({ message: error.message}, { status: 500 });
    }
}
