const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get triggered" });
});

const setUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  res.status(200).json({ message: "post triggered" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update user ${req.params.id}` });
});
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete user ${req.params.id}` });
});

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
};
