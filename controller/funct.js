
const User = require("../model/db") ;




async function creationOfUser(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    res.redirect("https://www.youtube.com/watch?v=OWeruyqhiTo&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=23");
}
module.exports = {creationOfUser};