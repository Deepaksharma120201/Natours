const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// GET /api/v1/tours
exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// GET /api/v1/tour:slug
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate([
    {
      path: "reviews",
      fields: "review rating user",
    },
    {
      path: "guides",
      select: "name role photo",
    },
  ]);

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// GET /api/v1/users/me
exports.getAccount = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

// PATCH /api/v1/users/updateMe
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
