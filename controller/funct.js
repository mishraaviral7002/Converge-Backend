
const User = require("../model/db") ;
const Dashboard = require("../model/dashboards");
const {v4 : uuidv4} = require("uuid")
const { getUserfromMap,setUserfromMap, sessionIdToUserMap} = require("../service/auth");
const { nanoid, customAlphabet } = require('nanoid');

async function creationOfUser(req, res){
    try {
        const {name, email, password} = req.body;
        await User.create({
            name,
            email,
            password
        });
        return res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function getUser(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email,
            password
        });
        if (user != null) {
            const sessionId = uuidv4();
            setUserfromMap(sessionId, user);
            res.cookie("uid", sessionId, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return res.status(200).json({ success: true, message: "Logged In" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function creationOfWhiteBoard(req, res) {

    try {

        const email = req.user.email;
        const {dashBoardname, aboutDashboard } = req.body;
        const generateCode = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 9);
        const myRoomCode = generateCode();
        const dashBoard = await Dashboard.create({
            email,
            dashBoardname,
            aboutDashboard,
            myRoomCode,



        });
        res.status(200).json({
            success: true,
            message : "DashBoard Created Successfully",
            // redirect_path: "http://localhost:5173/c",
            RoomCode :myRoomCode
        });
        }
    catch (error) {
        console.error("Error creating DB:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


async function retrivingDashBoards(req, res) {

    try {
        const email = req.user.email;
        const listOfCanvas = await Dashboard.find({
            email
        })
        if (listOfCanvas != null) {

            return res.status(200).json(listOfCanvas);


        }
        else {
            return res.status(404).send(NOT_FOUND_ERR);
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }


}


async function checkForLoggedIn(req , res ){
    try {
        const email = req.user.email;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            name: user.name,
            email: email
        });
    } catch (error) {
        console.error("Error in checkForLoggedIn:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

async function logoutUser(req , res){
    res.clearCookie('uid', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    if (req.cookies && req.cookies.uid) {
        sessionIdToUserMap.delete(req.cookies.uid);
    }
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}
async function savingShit(req, res) {
    try {
        const { roomAddress, data } = req.body;
        if (!roomAddress) {
            return res.status(400).json({ error: "Missing roomAddress" });
        }

        const curr = await Dashboard.findOne({ myRoomCode: roomAddress });
        if (!curr) {
            return res.status(404).json({ error: "Canvas not found" });
        }

        curr.canvas = data;
        curr.markModified('canvas');
        await curr.save();

        return res.status(200).json({ success: true, message: "Canvas saved successfully" });
    }
    catch (error) {
        console.error("Error saving canvas:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {creationOfUser, getUser , creationOfWhiteBoard , retrivingDashBoards , checkForLoggedIn ,logoutUser ,savingShit}