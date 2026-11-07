const express = require('express');

const app = express();
app.set('trust proxy', 1);
require('dotenv').config();
const router = require('./routes/routes');
const cookieParser = require("cookie-parser");
const connectDB = require('./model/dbconnector');

const cors = require('cors');
const allowedOrigins = [
    'https://converge-sq19.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch(() => {
        console.error("Backend startup aborted because database connection failed.");
        process.exit(1);
    });
