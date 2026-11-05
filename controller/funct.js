
const User = require("../model/db") ;
const Dashboard = require("../model/dashboards");
const {v4 : uuidv4} = require("uuid")
const { getUserfromMap,setUserfromMap} = require("../service/auth");
const { nanoid } = require('nanoid');

async function creationOfUser(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    res.redirect("https://converge-sq19.vercel.app/Login");
}

async function getUser(req, res) {

    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email,
            password
        })
        if (user != null) {
            const sessionId = uuidv4();
            setUserfromMap(sessionId, user);
            res.cookie("uid" ,sessionId);

            return res.send("Logged In");


        } else {
            return res.redirect("https://converge-sq19.vercel.app/");






    }
}
catch (error) {
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
        res.json({
            success: true,
            message : "DashBoard Created Successfully",
            redirect_path: "http://localhost:5173/dashboard"
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
    const email = req.user.email;
    const user = await User.findOne({
        email
    })

    return res.status(200).json({
        success:true,
        name:user.name ,
        email:email
    })
}

async function logoutUser(req , res){
    res.clearCookie('uid');
    sessionIdToUserMap.delete(req.cookies.uid);
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}



module.exports = {creationOfUser, getUser , creationOfWhiteBoard , retrivingDashBoards , checkForLoggedIn ,logoutUser}