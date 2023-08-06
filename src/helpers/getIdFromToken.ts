import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getIdFromToken = async (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
