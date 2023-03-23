const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Produts = require("../models/ProductsModel");

exports.getUsersProduct = catchAsync(async (req, res, next) => {
  const { Userid } = req.params;
  const userProducts = await Produts.find({ user: Userid });

  res.status(200).json({
    status: "Success",
    result: userProducts.length,
    userProducts,
  });
});
