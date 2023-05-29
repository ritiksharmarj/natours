const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

/**
 * @description - Get All Reviews
 * @route - GET /api/v1/reviews
 */
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  // Send response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

/**
 * @description - Create New Review
 * @route - POST /api/v1/reviews
 */
exports.createReview = catchAsync(async (req, res, next) => {
  // Creating new document and saving to the database
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
