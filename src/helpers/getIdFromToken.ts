import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

export const getIdFromToken = async (request: NextRequest) => {
    try {
        const encodedToken: any = request.cookies.get('token')?.value;

        if (!encodedToken) {
            throw new Error('Token not found');
        }

        try {
            const decodedToken: any = await jwtVerify(encodedToken, new TextEncoder().encode(process.env.TOKEN_SECRET));
            return decodedToken._id;
        } catch (error: any) {
            throw new Error('Invalid Token');
        }
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
