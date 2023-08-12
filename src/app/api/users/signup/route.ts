import userModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendMail } from "@/helpers/mailer";
import emailValidator from 'email-validator';
import { passwordPattern1, passwordPattern2, passwordPattern3 } from "../login/route";
import { connectMongoDB } from "@/dbConfig/connectMongoDB";

connectMongoDB();

export const POST = async (request: NextRequest) => {
    try {
        const errors: any[] = [];

        const { userName, email, phoneNumber, password } = await request.json();

        const existingEmail = await userModel.findOne({ email });
        const existingPhoneNumber = await userModel.findOne({ phoneNumber });

        if (!userName) {
            errors.push({ message: 'UserName Required', field: 'userName' });
        }

        if (!email) {
            errors.push({ message: 'Email Required', field: 'email' });
        } else if (!emailValidator.validate(email)) {
            errors.push({ message: 'Enter valid email', field: 'email' });
        }

        const phoneNoPattern = /^\d{10}$/;

        if (!phoneNumber) {
            errors.push({ message: 'Phone Number Required', field: 'phoneNumber' });
        } else if (phoneNumber.length < 10 || phoneNumber.length > 10 || !phoneNoPattern.test(phoneNumber)) {
            errors.push({ message: 'Enter valid 10 digit phone number', field: 'phoneNumber' });
        }

        if (!password) {
            errors.push({ message: 'Password Required', field: 'password' });
        } else if (!passwordPattern1.validate(password) &&
            !passwordPattern2.validate(password) &&
            !passwordPattern3.validate(password)) {
            errors.push({ message: 'Enter valid password', field: 'password' });
        }

        if (existingEmail) {
            errors.push({ message: 'Email Already Exists', field: 'email' });
        }

        if (existingPhoneNumber) {
            errors.push({ message: 'Phone Number Already Exists', field: 'phoneNumber' });
        }

        if (errors.length > 0) {
            throw errors;
        }

        const salt = await bcrypt.genSalt(10);

        if (!salt) {
            throw new Error('Error While Generating Salt');
        }

        const hashedPassword = await bcrypt.hash(password, salt);

        if (!hashedPassword) {
            throw new Error('Error While Hashing Password');
        }

        const newUser = new userModel({ userName, email, phoneNumber, password: hashedPassword });

        const savedUser = await newUser.save();

        if (!savedUser) {
            throw new Error('User Data Not Saved');
        }

        await sendMail(savedUser.email, process.env.EMAIL_TYPE_VERIFY, savedUser._id);

        return NextResponse.json({ message: "User created successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
