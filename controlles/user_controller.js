const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existngUser;
  try {
    existngUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existngUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new user({
    name,
    email,
    hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existngUser;
  try {
    (existngUser = await User), findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existngUser) {
    return res.json(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existngUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / password" });
  }
  const token = jwt.sign({ id: existngUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2hr",
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged in", user: existngUser, token });
};
const verifyToken = (req,res,next)=>{
    const headers = req.headers['authorization'];
    const token = headers.split(' ')[1];
    if(!token){
        res.status(404).json({message:"Not token found"})
    }
    jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({message:"Invalid Token"})
        }
        console.log(user.id)
        req.id = user.id;
    });
    next();
}
const getUser = async (req,res,next)=>{
const userId = req.id;
let user;
try{
    user = await User.findById(userId,"-password");
}catch(err){
   return new Error(err) 
}
if(!user){
    return res.status(404).json({message:"User not Found"})
}
return res.status(200).json({user})
}
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;