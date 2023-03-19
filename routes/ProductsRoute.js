const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/ProdutsController");

router.route("/get-all-products").get(productController.getAllProducts);

router.use(authController.protect, authController.restricTO("user"));
router.route("/creat-product").post(productController.createProduct);

module.exports = router;
