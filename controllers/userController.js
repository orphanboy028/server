const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

// get user details
exports.getMe = catchAsync(async (req, res, next) => {
  console.log(req.user._id);
  const me = await User.findById(req.user._id);

  res.status(200).json({
    status: "Success",
    me,
  });
});
