const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const EnquiriyController = require("../controllers/EnquiriyControler");

router
  .route("/:slug")
  .post(
    authController.protect,
    authController.restricTO("user"),
    EnquiriyController.enqueriyProduct
  );

router
  .route("/all-product-enquiry")
  .get(
    authController.protect,
    authController.restricTO("admin"),
    EnquiriyController.getAllEnquiry
  );

module.exports = router;
