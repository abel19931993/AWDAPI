const express = require('express');
const {
    signup,
    login,
    verifyToken,
    getUser,
} = require('../controlles/user_controller');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/token',verifyToken,getUser);

module.exports =router;