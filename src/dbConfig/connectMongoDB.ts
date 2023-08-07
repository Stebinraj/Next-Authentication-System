import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on('connecting', () => {
            console.log('Connecting to MongoDB');
        });

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('disconnecting', () => {
            console.log('Disconnecting from MongoDB...');
        });

        connection.on('disconnected', async () => {
            console.log('MongoDB connection disconnected');
        });

        connection.on('error', async (error) => {
            await connection.close();
            throw new Error(`Connection error :\n${error.message}`);
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
