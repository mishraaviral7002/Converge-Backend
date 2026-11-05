const {getUserfromMap ,setUserfromMap} = require("../service/auth");
const router = require("../routes/routes");
async function restrictToLoggedInUserOnly(req, res , next) {
    const UserUid = req.cookies.uid;
    if(!UserUid) {
        return res.redirect("https://converge-sq19.vercel.app/");
    }
    const user = getUserfromMap(UserUid) ;
    if(!user) {
        return res.redirect("https://converge-sq19.vercel.app/");
    }
    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedInUserOnly
};