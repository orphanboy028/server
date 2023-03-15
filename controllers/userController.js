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

exports.updateProfile = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const me = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    me,
  });
});

exports.updateCompanyLogo = catchAsync(async (req, res, next) => {
  console.log(req.file);
  const id = req.user._id;
  const fileName = "logo.png";
  const me = await User.findByIdAndUpdate(
    id,
    {
      photo: fileName,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "Success",
    me,
  });
});
