const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Multer configuration
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-8736482fgdf783-348763448734.jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only image.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Upload user photo using multer
exports.uploadUserPhoto = upload.single('photo');

// Resizing Images
exports.resizeUserPhoto = async (req, res, next) => {
  // If there is no file uploaded
  if (!req.file) return next();

  // user-8736482fgdf783-348763448734.jpeg
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

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

// Middleware function for the route "/me"
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

/**
 * @description - Update current user
 * @route - PATCH /api/v1/users/updateMe
 */
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

  // (Optional) If user uploads new photo then add it to filterbody object
  if (req.file) filterBody.photo = req.file.filename;

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

/**
 * @description - Delete current user
 * @route - DELETE /api/v1/users/deleteMe
 */
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
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use "/signup" instead.',
  });
};

/**
 * @description - Get All Users
 * @route - GET /api/v1/users
 */
exports.getAllUsers = factory.getAll(User);

/**
 * @description - Get User (Single)
 * @route - GET /api/v1/users/:id
 */
exports.getUser = factory.getOne(User);

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
