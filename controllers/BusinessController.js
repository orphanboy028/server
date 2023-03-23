const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Business = require("../models/BusinessModel");
const multer = require("multer");

exports.createBusiness = catchAsync(async (req, res, next) => {
  const { CompanyName, GstNumber, PanNumber } = req.body;
  const newBusiness = await Business.create({
    CompanyName,
    GstNumber,
    PanNumber,
    BusiessOwner: req.user._id,
  });

  // Find a user by ID and add the new business to their profile
  const user = await User.findById(req.user._id);
  user.businessDetails = newBusiness._id;
  await user.save();

  res.status(200).json({
    status: "Success",
    newBusiness,
  });
});
