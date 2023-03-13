const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/singUp", authController.singUp);

module.exports = router;
