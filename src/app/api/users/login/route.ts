import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectMongoDB } from "@/dbConfig/connectMongoDB";

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const errors: any[] = [];

        const { email, password } = await request.json();

        if (!email) {
            errors.push({ message: 'Email Required', field: 'email' });
        }

        if (!password) {
            errors.push({ message: 'Password Required', field: 'password' });
        }

        if (errors.length > 0) {
            throw errors;
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            errors.push({ message: 'Email does not exists', field: 'email' });
            throw errors;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            errors.push({ message: 'Invalid Password', field: 'password' });
            throw errors;
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '12h' });

        if (!token) {
            throw new Error('Login Data Encryption failed');
        }

        const response = NextResponse.json({
            message: 'Login Successfully', success: true
        });

        response.cookies.set('token', token, {
            httpOnly: true, expires: Date.now() + 43200000,
            secure: true, sameSite: 'strict'
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
