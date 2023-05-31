const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

/**
 * @description - Get All Reviews
 * @route - GET /api/v1/reviews
 */
exports.getAllReviews = factory.getAll(Review);

/**
 * @description - Get Review (Single)
 * @route - GET /api/v1/reviews/:id
 */
exports.getReview = factory.getOne(Review);

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
