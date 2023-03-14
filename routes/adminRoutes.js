const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/admin-singUp", authController.adminSingUp);
router.post("/admin-login", authController.adminLogin);

module.exports = router;
