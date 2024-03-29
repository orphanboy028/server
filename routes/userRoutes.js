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
  )
  .patch(
    authController.protect,
    authController.restricTO("user"),
    userController.updateProfile
  );

router
  .route("/update-logo")
  .patch(
    authController.protect,
    authController.restricTO("user"),
    userController.uploadCompanyLogo,
    userController.updateCompanyLogo
  );

router
  .route("/users")
  .get(
    authController.protect,
    authController.restricTO("user", "admin"),
    userController.getAllUser
  );
module.exports = router;
