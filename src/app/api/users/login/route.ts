import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '12h' });

        const response = NextResponse.json({
            message: 'Login Successfully', success: true
        });

        response.cookies.set('token', token, {
            httpOnly: true, expires: Date.now() + 43200000,
            secure: true, sameSite: 'strict'
        });

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message })
    }
}
