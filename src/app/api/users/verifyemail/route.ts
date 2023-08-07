import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const { token } = await request.json();

        const user = await userModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: 'Token Invalid', error: true }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, error: true }, { status: 500 });
    }
}
