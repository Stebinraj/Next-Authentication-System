import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import { sendMail } from "@/helpers/mailer";
import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const { token } = await request.json();

        if (!token) {
            throw new Error('No token found');
        }

        const findToken = await userModel.findOne({ verifyToken: token });

        if (!findToken) {
            throw new Error('Token expired');
        }

        const user = await userModel.findOne({
            verifyToken: findToken.verifyToken,
            verifyTokenExpiry: { $gt: Date.now() },
            isVerified: false
        });

        if (!user) {
            await sendMail(findToken.email, process.env.EMAIL_TYPE_VERIFY, findToken._id);
            throw new Error('Token expired check your email to verify');
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const saved = await user.save();

        if (!saved) {
            throw new Error('Verification failed');
        }

        return NextResponse.json({ message: "Email verified successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
