const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

// create tooken
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "Success",
    token,
    user,
  });
};

// jwt tooken function
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// User registration
exports.singUp = catchAsync(async (req, res, next) => {
  const { name, email, mobileNumber, password, passwordConfirm } = req.body;
  //   check the user input file isEmpity
  if ((!name || !email || !mobileNumber, !password, !passwordConfirm)) {
    return next(new AppError("Please Provide Required filed"));
  }
  // check user email is Already Exist
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new AppError("you have already account Please Login"));
  }
  const newUser = await User.create({
    name,
    email,
    mobileNumber,
    password,
  });

  createSendToken(newUser, 201, res);
});

// Login Api
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email && !password) {
    return next(new AppError("Please Provide Email and Password"));
  }
  // 2) check if user exist && password is correct
  const user = await User.findOne({ email }).select("+password");
  // 3) if everythng ok, send token to client

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorect email or password", 401));
  }

  createSendToken(user, 200, res);
});
