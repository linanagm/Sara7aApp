import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/sara7aApp", {
            serverSelectionTimeoutMS: 5000 // Keep trying to connect for 5 seconds
        });
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error ", error.message);
    }
};

export default connectDB;