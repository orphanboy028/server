const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/singUp", authController.singUp);
router.post("/login", authController.login);

router
  .route("/update-me")
  .get(
    authController.protect,
    authController.restricTO("user"),
    userController.getMe
  );

module.exports = router;
