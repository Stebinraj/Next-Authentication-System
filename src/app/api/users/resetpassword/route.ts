import { connectMongoDB } from '@/dbConfig/connectMongoDB';
import { sendMail } from '@/helpers/mailer';
import userModel from '@/models/UserModel';
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const { email } = await request.json();
        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'Email not found', error: true });
        }

        await sendMail(user.email, process.env.EMAIL_TYPE_RESET, user._id);

        return NextResponse.json({ message: 'Reset Password Successfully', success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, error: true });
    }
}
