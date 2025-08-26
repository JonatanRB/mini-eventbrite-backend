import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectMongo(params) {
    const usi = env.mongoUri;
    if (!uri) throw new Error('MONGODB_URI is required');
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { autoIndex: true});
    console.log('[DB] Connected to mongo');
};