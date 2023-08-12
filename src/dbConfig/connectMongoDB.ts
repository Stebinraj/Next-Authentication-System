import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error: any) {
        throw new Error('Connection / Network Error');
    }
}
