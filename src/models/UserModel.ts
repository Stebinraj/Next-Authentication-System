import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username required!!!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required!!!']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number required!!!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password required!!!']
    }
});

const userModel = mongoose.models.users || mongoose.model('users', userSchema);

export default userModel;