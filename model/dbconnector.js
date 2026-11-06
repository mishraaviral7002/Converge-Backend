const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google DNS (fixes Jio/Reliance SRV lookup failures)
dns.setServers(['8.8.8.8', '8.8.4.4']);

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
