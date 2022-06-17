const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  let existngUser;
  try {
    existngUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
  }
  if (existngUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  console.log("hi");
  const { email, password } = req.body;
  let existngUser;
  try {
    existngUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existngUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existngUser.password);

  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / password" });
  }
  const token = jwt.sign({ id: existngUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",
  });
  console.log("Generated Token\n", token);

  if (req.cookies[`${existngUser._id}`]) {
    req.cookies[`${existngUser._id}`] = "";
  }
  res.cookie(String(existngUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Successfully Logged in" });
};
const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
  // const headers = req.headers["authorization"];
  // const token = headers.split(" ")[1];

  // if (!token) {
  //  return  res.status(404).json({ message: "Not token found" });
  // }
  // jwt.verify(String(token),process.env.JWT_SECRET_KEY, (err, user) => {
  //   if (err) {
  //     return res.status(400).json({ message: "Invalid Token" });
  //   }
  //   console.log(user.id);
  //   req.id = user.id;
  // });
  // next();
};
const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ user });
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
   

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};
const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.refreshToken = refreshToken;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
