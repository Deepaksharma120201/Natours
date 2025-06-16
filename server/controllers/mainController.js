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
      path: "guides",
      select: "name role photo",
    },
    {
      path: "reviews",
      select: "review rating user createdAt",
      populate: {
        path: "user",
        select: "name photo",
      },
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

exports.logout = (req, res) => {
  console.log("Logging out...");
  res.cookie("jwt", "loggedout", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ status: "success" });
};

exports.getCurrentUser = (req, res, next) => {
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
