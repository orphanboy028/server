const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Categories = require("../models/CategoryModel");
const SubCategory = require("../models/subCategoreyModel");
const LefCategory = require("../models/leafCategoryModel");
const path = require("path");

// multer for image
const multer = require("multer");

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.resolve(`${__dirname}/../../frontend/public/categories-images`)
    );
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerstorage,
});

exports.uploadCategoriesImage = upload.single("categoryImage");
exports.uploadSubCategoriesImage = upload.single("SubcategoryImage");
exports.uploadLefCategoriesImage = upload.single("lefcategoryImage");

///////////////////////////////
// Get All category
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Categories.find().populate({
    path: "subCategory",
    populate: {
      path: "lefCategory",
    },
  });
  //Category Response
  res.status(200).json({
    status: "Success",
    results: allCategories.length,
    allCategories,
  });
});

exports.getAllSubCategories = catchAsync(async (req, res, next) => {
  const allSubCategories = await SubCategory.find().populate("lefCategory");
  //Category Response
  res.status(200).json({
    status: "Success",
    results: allSubCategories.length,
    allSubCategories,
  });
});

exports.getSubCategories = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const getAllSubCategories = await SubCategory.find({
    categorySlug: categorySlug,
  }).populate("lefCategory");

  res.status(200).json({
    status: "Success",
    results: getAllSubCategories.length,
    getAllSubCategories,
  });
});

// Get Lef Catogries
exports.getAllLeafCatgories = catchAsync(async (req, res, next) => {
  const { subcategoryslug } = req.params;
  const getAll = await LefCategory.find({
    subcategoryslug: subcategoryslug,
  });

  res.status(200).json({
    status: "Success",
    getAll,
  });
});

// Create only Main category by Admin
exports.createCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { categoryName } = req.body;
  const photoname = req.file.filename;

  const newCategory = await Categories.create({
    categoryName: categoryName,
    categoryImage: photoname,
  });

  res.status(200).json({
    status: "Success",
    newCategory,
  });
});

// Create Sub-Categories
exports.createSubCategory = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const { subCategoryName, descreption } = req.body;
  const photoname = req.file.filename;

  const subCategory = await SubCategory.create({
    subCategoryName,
    descreption,
    categorySlug,
    SubcategoryImage: photoname,
  });
  res.status(200).json({
    status: "Success",
    subCategory,
  });
});

// create Leaf Category
exports.createLeafCategory = catchAsync(async (req, res, next) => {
  const { subcategoryslug } = req.params;
  const { lefCategoryName, descreption } = req.body;
  const photoname = req.file.filename;
  const createLefCategory = await LefCategory.create({
    lefCategoryName,
    descreption,
    subcategoryslug,
    lefcategoryImage: photoname,
  });
  res.status(200).json({
    status: "Success",
    createLefCategory,
  });
});

// Update main Category
exports.updateMainCategory = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const { categoryName } = req.body;
  const photoname = req.file.filename;

  const updatecategorye = await Categories.findOneAndUpdate(
    { slug: categorySlug },
    {
      categoryName: categoryName,
      categoryImage: photoname,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "Success",
    requesteAt: req.requestTime,
    updatecategorye,
  });
});

exports.addSubCategories = catchAsync(async (req, res, next) => {
  const { categorySlug } = req.params;
  const { subCategoryId } = req.body;

  const addSubCategoies = await Categories.findOneAndUpdate(
    { slug: categorySlug },
    {
      $addToSet: { subCategory: subCategoryId },
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "Success",
    addSubCategoies,
  });
});

exports.addLefCategories = catchAsync(async (req, res, next) => {
  const { subcategoryslug } = req.params;
  const { lefCategoryId } = req.body;
  const addLefategoies = await SubCategory.findOneAndUpdate(
    { slug: subcategoryslug },
    {
      $addToSet: { lefCategory: lefCategoryId },
    },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "Success",
    addLefategoies,
  });
});

// Delete Main Category
exports.deleteMainCategory = catchAsync(async (req, res, next) => {
  const { categoryId } = req.params || req.body;

  const category = await Categories.findById(categoryId);

  if (category.subCategory.length >= 1) {
    return next(
      AppError(
        "categorie have sub-categorey please delete all the sub-categories first",
        401
      )
    );
  } else {
    await Categories.findByIdAndDelete(categoryId);
  }

  res.status(200).json({
    status: "Success",
  });
});
