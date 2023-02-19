const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

function generateAccessToken(user, duration) {
  return jwt.sign({ user }, process.env.MY_ACCESS_TOKEN_SECRET, {
    expiresIn: duration,
  });
}

function checkToken(token) {
  return jwt.verify(token, process.env.MY_ACCESS_TOKEN_SECRET);
}

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const setUser = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.password ||
    !req.body.email
  ) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const result = generateAccessToken(user, "1d");
    res.status(200).json(result);
  }
});
module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
};
