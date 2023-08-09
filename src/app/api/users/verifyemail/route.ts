import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectMongoDB();

        const { token } = await request.json();

        if (!token) {
            throw new Error('No token found');
        }

        const user = await userModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error('Token invalid / expired');
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
