const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

/**
 * Filter req.body object for "name" and "email" and store it to newObj
 *
 * @param {Object} obj - req.body is an object
 * @param  {Array} allowedFields - Array ["name", "email"]
 * @returns Object
 */
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

/**
 * @description - Get All Users
 * @route - GET /api/v1/users
 */
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document (only name and email)
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/**
 * @description - Create New User
 * @route - POST /api/v1/users
 */
exports.createUser = factory.createOne(User);

/**
 * @description - Get User (Single)
 * @route - GET /api/v1/users/:id
 */
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

/**
 * @description - Update User
 * @route - PATCH /api/v1/users/:id
 */
exports.updateUser = factory.updateOne(User);

/**
 * @description - Delete User
 * @route - DELETE /api/v1/users/:id
 */
exports.deleteUser = factory.deleteOne(User);
