const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const Produts = require("../models/ProductsModel");
const Enquiries = require("../models/EnquiryModel");
const sendEmail = require("./../utils/email");

///
exports.enqueriyProduct = catchAsync(async (req, res, next) => {
  //  find product id from url slug
  const { slug } = req.params;
  const productId = await Produts.findOne({ slug });
  console.log(productId._id);
  await sendEmail({
    email: "comapny@gmail.com",
    subject: "This is Enqury from user",
    message:
      "<h1>some one sent you enquery for your product go to our app and check the enquery<h1>",
  });
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
