const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userfound = await User.findOne({ email });
  if (userfound) {
    res.status(400);
    throw new Error("User Already Exists!");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Not able to Save User in Database");
  }
});

exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordMatched = await user.matchPassword(password);
  if (user && passwordMatched) {
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
