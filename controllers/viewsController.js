const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;

  if (alert === 'booking')
    res.locals.alert =
      "Reservation confirmed! Check your inbox for a confirmation email. If your booking doesn't appear immediately, please return later.";

  next();
};

/**
 * @description - Get all tours
 * @route - GET Root("/")
 */
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', { title: 'All Tours', tours });
});

/**
 * @description - Get tour detail page
 * @route - GET /tour/:slug
 */
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

/**
 * @description - Get login page
 * @route - GET /login
 */
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

/**
 * @description - Get signup page
 * @route - GET /signup
 */
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
  });
};

/**
 * @description - Get account page
 * @route - GET /me
 */
exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

/**
 * @description - Get all booked tours of current user
 * @route - GET /my-bookings
 */
exports.getMyBookings = async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', { title: 'My Bookings', tours });
};

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updatedUser,
//   });
// });
