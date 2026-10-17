const express = require('express');
const router = express.Router();
const {creationOfUser} = require('../controller/funct.js');
router.get('/', (req, res) => {
    res.send("Welcome");
});

router.post('/register', creationOfUser) ;



module.exports = router;