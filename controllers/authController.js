const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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

// admin singUp API
exports.adminSingUp = catchAsync(async (req, res, next) => {
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
    role: "admin",
  });

  createSendToken(newUser, 201, res);
});

exports.adminLogin = catchAsync(async (req, res, next) => {
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

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Your are not logIn Please login to acces"), 401);
  }

  // 2) Verifing Tooken
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user exist
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError("The token does not blonging to this user", 401));
  }
  // 4) check if user changed password
  // pendng....

  // Grant acces to Protected Route
  req.user = freshUser;
  next();
});

exports.restricTO = (...roles) => {
  return (req, res, next) => {
    // roles in Array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to acces this", 403)
      );
    }

    next();
  };
};
