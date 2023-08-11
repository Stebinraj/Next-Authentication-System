import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import { sendMail } from "@/helpers/mailer";
import emailValidator from 'email-validator';
import { passwordPattern } from "@/helpers/passwordPattern";

export const passwordPattern1 = passwordPattern(8, 20, 1, 1, 1);
export const passwordPattern2 = passwordPattern(8, 20, 1, 1, 1, 1);
export const passwordPattern3 = passwordPattern(10, 20, 1, 1, 1, 1);

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const errors: any[] = [];

        const { email, password } = await request.json();

        if (!email) {
            errors.push({ message: 'Email Required', field: 'email' });
        } else if (!emailValidator.validate(email)) {
            errors.push({ message: 'Enter valid email', field: 'email' });
        }

        if (!password) {
            errors.push({ message: 'Password Required', field: 'password' });
        } else if (!passwordPattern1.validate(password) &&
            !passwordPattern2.validate(password) &&
            !passwordPattern3.validate(password)) {
            errors.push({ message: 'Enter valid password', field: 'password' });
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

        if (!user.isVerified && Date.now() > user.verifyTokenExpiry) {
            await sendMail(user.email, process.env.EMAIL_TYPE_VERIFY, user._id);
            throw new Error('Verify your account check your email');
        } else if (!user.isVerified) {
            throw new Error('Verify your account check your email');
        }

        const tokenData = {
            _id: user._id,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '12h' });

        if (!token) {
            throw new Error('Login Data Encryption failed');
        }

        const response = NextResponse.json({ message: 'Login Successfully' });

        const { COOKIES_PATH, DOMAIN } = process.env

        response.cookies.set('token', token, {
            httpOnly: true, expires: Date.now() + 43200000,
            secure: true, sameSite: 'strict',
            path: COOKIES_PATH,
            domain: DOMAIN
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
