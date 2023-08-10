import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/UserModel";
import bcrypt from 'bcrypt';
import { sendMail } from "@/helpers/mailer";
import { passwordPattern1, passwordPattern2, passwordPattern3 } from "../login/route";

export const POST = async (request: NextRequest) => {
    try {
        const errors: any[] = [];

        await connectMongoDB();

        const { token, password } = await request.json();

        if (!token) {
            throw new Error('Token required');
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

        const findToken = await userModel.findOne({ forgotPasswordToken: token });

        if (!findToken) {
            throw new Error('Token expired');
        }

        const user = await userModel.findOne({
            forgotPasswordToken: findToken.forgotPasswordToken,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
            isVerified: true
        });

        if (!user) {
            await sendMail(findToken.email, process.env.EMAIL_TYPE_RESET, findToken._id);
            throw new Error('Token expired check your email to reset');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        const saved = await user.save();

        if (!saved) {
            throw new Error('Password reset failed');
        }

        return NextResponse.json({ message: "Paassword Updated successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}