const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const verifyToken = require("../services/auth");

router.post("/register", userController.create);
router.post("/authenticate", userController.authenticate);
router.get("/profile", userController.profile);

module.exports = router;
