const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/ProdutsController");

router.route("/get-all-products").get(productController.getAllProducts);

router.use(authController.protect, authController.restricTO("user"));
router.route("/creat-product").post(productController.createProduct);
router
  .route("/update-feature-image")
  .patch(
    productController.uploadProductFeatureImage,
    productController.updateFeatureImage
  );

router
  .route("/update-Gallery-image")
  .patch(
    productController.uploadProductsGalleryImages,
    productController.updateGalleryImage
  );

module.exports = router;
