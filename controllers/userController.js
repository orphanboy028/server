const catchAsync = require("../utils/catchAsync");
const path = require("path");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const multer = require("multer");

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`${__dirname}/../../frontend/public/company-logos`));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerstorage,
});

exports.uploadCompanyLogo = upload.single("photo");

// get user details
exports.getMe = catchAsync(async (req, res, next) => {
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
  const id = req.user._id;
  const photoname = req.file.filename;
  console.log(photoname);
  const me = await User.findByIdAndUpdate(
    id,
    {
      photo: photoname,
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
