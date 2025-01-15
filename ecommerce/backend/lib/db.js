import mongoose from 'mongoose';

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log("error connecting to mongodb" + err.message);
        process.exit(1);
    }
}