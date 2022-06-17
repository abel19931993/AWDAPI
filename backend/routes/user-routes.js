const express = require('express');
const {
    signup,
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
} = require('../controlles/user_controller');
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/token',verifyToken,getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.get("/", async (req, res) => {
    try {
      res.send("HELLO");
      console.log("This is from the user route")
    } catch (error) {
      res.json({ message: error });
    }
  });
module.exports =router;