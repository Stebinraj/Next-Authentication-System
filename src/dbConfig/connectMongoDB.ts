import mongoose from "mongoose"
import { NextResponse } from "next/server";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('disconnected', () => {
            console.log('MongoDB connection disconnected');
        });

        connection.on('error', async (error) => {
            await connection.close();
            throw new Error(`Connection error :\n${error.message}`);
        });

    } catch (error: any) {
        console.log(error.message || error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
