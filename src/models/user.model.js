import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['vendedor', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)