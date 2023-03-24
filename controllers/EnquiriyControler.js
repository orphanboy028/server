const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const Produts = require("../models/ProductsModel");
const Enquiries = require("../models/EnquiryModel");

exports.enqueriyProduct = catchAsync(async (req, res, next) => {
  //  find product id from url slug
  const { slug } = req.params;
  const productId = await Produts.findOne({ slug });
  console.log(productId._id);

  const newEnquery = await Enquiries.create({
    product: productId,
    user: req.user._id,
  });

  res.status(200).json({
    status: "Success",
    newEnquery,
  });
});

exports.getAllEnquiry = catchAsync(async (req, res, next) => {
  const allEnquiry = await Enquiries.find();
  res.status(200).json({
    status: "Success",
    result: allEnquiry.length,
    allEnquiry,
  });
});
