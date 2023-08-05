import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import userModel from "@/models/UserModel";

export const POST = async (request: NextRequest) => {
    try {
        const { userName, email, phoneNumber, password } = await request.json();

        const user = await userModel.findOne({ email, phoneNumber });
        if (user) {
            return NextResponse.json({ message: 'User already exists', error: true }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ userName, email, phoneNumber, password: hashedPassword });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully", success: true });
    } catch (error: any) {
        console.log(error || error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
