const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

// User registration
exports.singUp = catchAsync(async (req, res, next) => {
  const { name, email, mobileNumber, password, passwordConfirm } = req.body;

  //   check the user input file isEmpity
  if ((!name || !email || !mobileNumber, !password, !passwordConfirm)) {
    return next(new AppError("Please Provide Required filed"));
  }

  const newUser = await User.create({
    name,
    email,
    mobileNumber,
    password,
  });

  res.status(200).json({
    status: "Success",
    message: "you are register sucesfully",
    newUser,
  });
});
