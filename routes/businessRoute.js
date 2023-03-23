const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const BusinessController = require("../controllers/BusinessController");

router
  .route("/")
  .post(
    authController.protect,
    authController.restricTO("user"),
    BusinessController.createBusiness
  );

module.exports = router;
