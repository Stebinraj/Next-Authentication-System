import { connectMongoDB } from '@/dbConfig/connectMongoDB';
import { sendMail } from '@/helpers/mailer';
import userModel from '@/models/UserModel';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const errors: any[] = [];

        await connectMongoDB();

        const { email } = await request.json();

        if (!email) {
            errors.push({ message: 'Email Required', field: 'email' });
            throw errors;
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            errors.push({ message: 'Email not found', field: 'email' });
            throw errors;
        }

        if (!user.isVerified) {
            throw new Error('User is not verified');
        }

        if (!user.forgotPasswordToken &&
            !user.forgotPasswordTokenExpiry) {
            await sendMail(user.email, process.env.EMAIL_TYPE_RESET, user._id);
        } else if (user.forgotPasswordToken &&
            Date.now() > user.forgotPasswordTokenExpiry) {
            await sendMail(user.email, process.env.EMAIL_TYPE_RESET, user._id);
        } else {
            throw new Error('Check your email for password reset');
        }

        return NextResponse.json({ message: 'Check your email to reset password' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
