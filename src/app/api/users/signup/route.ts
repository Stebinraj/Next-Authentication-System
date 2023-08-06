import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { connectMongoDB } from "@/dbConfig/connectMongoDB";
import { sendMail } from "@/helpers/mailer";

connectMongoDB();

export const POST = async (request: NextRequest) => {
    try {
        const { userName, email, phoneNumber, password } = await request.json();

        const user = await userModel.findOne({ email, phoneNumber });

        if (user) {
            return NextResponse.json({ message: 'User already exists', error: true });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ userName, email, phoneNumber, password: hashedPassword });

        await newUser.save();

        await sendMail(newUser.email, process.env.EMAIL_TYPE_VERIFY, newUser._id);

        return NextResponse.json({ message: "User created successfully", success: true });
    } catch (error: any) {
        console.log(error || error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
