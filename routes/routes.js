const express = require('express');
const router = express.Router();
const  {creationOfUser, getUser , creationOfWhiteBoard ,retrivingDashBoards, checkForLoggedIn , logoutUser} = require("../controller/funct.js");
const {} = require("../middleware/auth");
const {restrictToLoggedInUserOnly} = require("../middleware/auth");





router.get('/', (req, res) => {
    res.send("Welcome");
});

router.post('/register', creationOfUser) ;

router.post('/login', getUser) ;

router.post('/createDashBoard', restrictToLoggedInUserOnly , creationOfWhiteBoard) ;



router.get('/getCanvas' , restrictToLoggedInUserOnly , retrivingDashBoards) ;
router.get('/checkForLoggedIn' , restrictToLoggedInUserOnly , checkForLoggedIn) ;
router.post('/logout', logoutUser);


module.exports = router;