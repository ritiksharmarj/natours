const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

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

/**
 * @description - Create New User
 * @route - POST /api/v1/users
 */
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

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
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

/**
 * @description - Delete User
 * @route - DELETE /api/v1/users/:id
 */
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
