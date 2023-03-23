const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

router.post("/admin-singUp", authController.adminSingUp);
router.post("/admin-login", authController.adminLogin);

router
  .route("/get-user-products/:Userid")
  .get(
    authController.protect,
    authController.restricTO("admin"),
    adminController.getUsersProduct
  );

module.exports = router;
