import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getIdFromToken = (request: NextRequest) => {
    try {
        const encodedToken: any = request.cookies.get('token')?.value;

        if (!encodedToken) {
            request.cookies.clear();
            throw new Error('Token not found');
        }

        try {
            const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
            return decodedToken._id;
        } catch (error: any) {
            request.cookies.clear();
            throw new Error('Invalid Token');
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
}
