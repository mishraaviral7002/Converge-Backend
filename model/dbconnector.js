const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error("MONGODB_URI is missing from .env");
        }

        await mongoose.connect(uri);

        console.log("MongoDB Atlas Connected Successfully");
    }
    catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;