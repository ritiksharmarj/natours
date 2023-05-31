const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

/**
 * @description - Get All Reviews
 * @route - GET /api/v1/reviews
 */
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  // Send response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

/**
 * @description - Create New Review
 * @route - POST /api/v1/reviews
 */
exports.createReview = factory.createOne(Review);

/**
 * @description - Delete Review
 * @route - DELETE /api/v1/reviews/:id
 */
exports.deleteReview = factory.deleteOne(Review);

/**
 * @description - Update Review
 * @route - PATCH /api/v1/reviews/:id
 */
exports.updateReview = factory.updateOne(Review);
