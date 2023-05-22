const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @description - Create New User
 * @route - POST /api/v1/users/signup
 */
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

/**
 * @description - Login User
 * @route - POST /api/v1/users/login
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if user provide email and password
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  /**
   * 3) Check if user not exists or password is incorrect
   * "correctPassword" our own custom document instance methods from "userModel.js" which returns boolean
   */
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
  });
});

/**
 * Middleware function to check if the user is authenticated
 * @description - Only login user can access tour routes
 */
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token, and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please login to get access!', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user associated with this token no longer exists.', 401)
    );
  }

  /**
   * 4) Check if user changed password after the token was issued
   * "changedPasswordAfter" is document instance methods from "userModel.js" which returns boolean
   */
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

/**
 * Middleware function to check user's role is either admin or lead-guide
 * @description - It will restrict to other roles to perform next action
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles = ['admin', 'lead-guide'] and if role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action.", 403)
      );
    }

    next();
  };
};

/**
 * @description - Forgot Password
 * @route - POST /api/v1/users/forgotPassword
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address.', 403));
  }

  // 2) Generate the random reset token for the user
  const resetToken = user.generatePasswordResetToken(); // without encrypted/simple token
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`; // e.g. http://127.0.0.1:8000/api/v1/users/resetPassword/2342342

  const message = `Hello ${user.email}!\nSomeone requested a link to change your password. Click the link below to proceed.\n${resetURL}\nIf you didn’t request this, please ignore the email. Your password will stay safe and won’t be changed.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset password instructions for Natours account',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});
