const { getUserfromMap } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    // Make sure cookie-parser middleware is enabled so req.cookies works
    const UserUid = req.cookies?.uid;

    if (!UserUid) {
        return res.status(401).json({ success: false, message: "Unauthorized: No session token found" });
    }

    const user = getUserfromMap(UserUid);
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid session" });
    }

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly
};