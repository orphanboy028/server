const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const multer = require("multer");

const upload = multer({ dest: "../../frontend/public/company-logos/" });

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
    upload.single("photo"),
    userController.updateCompanyLogo
  );
module.exports = router;
