import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI!);
        if (!connection) {
            throw new Error('Connection/Network Error');
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}
