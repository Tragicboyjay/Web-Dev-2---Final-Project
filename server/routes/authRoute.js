const express = require('express');
const router = express.Router();

const {
    createUser,
    authenticateUser
} 
= require("../controller/authController");

router.post("/create/:type", createUser);
router.post("/authenticate/:type", authenticateUser);


module.exports = router;