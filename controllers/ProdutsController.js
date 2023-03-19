const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const Produts = require("../models/ProductsModel");
const multer = require("multer");

exports.createProduct = catchAsync(async (req, res, next) => {
  const createProduct = await Produts.create(req.body);

  res.status(200).json({
    status: "Success",
    createProduct,
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
