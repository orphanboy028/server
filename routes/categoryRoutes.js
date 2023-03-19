const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

router.route("/getAll-categories").get(categoryController.getAllCategories);
router
  .route("/getAll-subcategories")
  .get(categoryController.getAllSubCategories);
router
  .route("/getAll-sub-categories/:categorySlug")
  .get(categoryController.getSubCategories);
router
  .route("/getAll-lef-categories/:subcategoryslug")
  .get(categoryController.getAllLeafCatgories);

// only user for admin or restic person
router.use(authController.protect);

// Create,  delete main categorie
router
  .route("/main-categorie")
  .post(
    authController.restricTO("admin"),
    categoryController.uploadCategoriesImage,
    categoryController.createCategory
  )
  .delete(
    authController.restricTO("admin"),
    categoryController.uploadCategoriesImage,
    categoryController.deleteMainCategory
  );

router
  .route("/main-categorie/:categorySlug")
  .patch(
    authController.restricTO("admin"),
    categoryController.uploadCategoriesImage,
    categoryController.updateMainCategory
  );

// create and get sub-categorie baise on main-categories
router
  .route("/sub-categorie/:categorySlug")
  .post(
    authController.restricTO("admin"),
    categoryController.uploadSubCategoriesImage,
    categoryController.createSubCategory
  )
  .patch(
    authController.restricTO("admin"),
    categoryController.addSubCategories
  );

// Create and get lef categories based on subcategories
router
  .route("/lef-categorie/:subcategoryslug")
  .post(
    authController.restricTO("admin"),
    categoryController.uploadLefCategoriesImage,
    categoryController.createLeafCategory
  )
  .patch(
    authController.restricTO("admin"),
    categoryController.addLefCategories
  );

module.exports = router;
