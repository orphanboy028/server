const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const Produts = require("../models/ProductsModel");
const multer = require("multer");

// update feature image
const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.resolve(`${__dirname}/../../frontend/public/product-gallery-images`)
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

exports.uploadProductFeatureImage = upload.single("images");
exports.uploadProductsGalleryImages = upload.array("imageGallery", 12);

exports.createProduct = catchAsync(async (req, res, next) => {
  // Add the user ID to the request body using Object.assign
  const productData = Object.assign(req.body, { user: req.user._id });
  const createProduct = await Produts.create(productData);

  res.status(200).json({
    status: "Success",
    createProduct,
  });
});

exports.updateFeatureImage = catchAsync(async (req, res, next) => {
  const { productId, productname } = req.body;
  const photoname = req.files.filename;

  const fetureImage = await Produts.findByIdAndUpdate(
    productId,
    {
      images: {
        url: photoname,
        altText: productname,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "Success",
    fetureImage,
  });
});

exports.updateGalleryImage = catchAsync(async (req, res, next) => {
  const { productId, productname } = req.body;
  const files = req.files;

  const images = [];

  for (const file of files) {
    images.push({
      url: file.filename,
      altText: productname,
    });
  }

  const galleyImages = await Produts.findByIdAndUpdate(
    productId,
    {
      imageGallery: images,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "Success",
    galleyImages,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await Produts.find();

  res.status(200).json({
    status: "Success",
    results: allProducts.length,
    allProducts,
  });
});
