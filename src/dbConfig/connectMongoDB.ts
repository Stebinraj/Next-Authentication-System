import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!);

        // const connection = mongoose.connection;

        // connection.on('connected', () => {
        //     console.log('MongoDB connected successfully');
        // });

        // connection.on('disconnected', () => {
        //     console.log('MongoDB connection disconnected');
        // });

        // connection.on('error', async (error) => {
        //     await connection.close();
        //     throw new Error(`Connection error :\n${error.message}`);
        // });

    } catch (error: any) {
        console.log(error.message || error);
    }
}
