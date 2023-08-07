import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import { NextRequest, NextResponse } from "next/server"
import userModel from "@/models/UserModel";
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const { token, password } = await request.json();

        const user = await userModel.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: 'Token Invalid', error: true }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Paassword Updated successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}