const express = require('express');

const app = express();
require('dotenv').config();
const router = require('./routes/routes');
const cookieParser = require("cookie-parser") ;
const connectDB = require('./model/dbconnector');

const cors = require('cors');
app.use(cors({
    origin: 'https://converge-sq19.vercel.app',
    credentials: true ,
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