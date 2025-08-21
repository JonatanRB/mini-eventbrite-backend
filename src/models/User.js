import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    role : {
        type: String,
        enum: ['user', 'organizer','staff','admin'],
        default: 'user',
    }, 
}, {timestamps: true});

userSchema.static.hashPassword = async function (password) {
    const salt = await bcrypt.getSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.method.checkPassword = async function (password) {
    return bcrypt.hash(password, this.passwordHash);
}

export const  User = mongoose.model('User', userSchema);