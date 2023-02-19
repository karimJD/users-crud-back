const express = require("express");
const verifyToken = require("../config/verifToken");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", verifyToken, userController.getUsers);
router.post("/", userController.setUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;
