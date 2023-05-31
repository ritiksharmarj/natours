const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// Reviews routes
router.route('/').get(reviewController.getAllReviews).post(
  authController.protect, // login user can review only
  authController.restrictTo('user'), // to review, user's role should be "user" not admin, guide, etc.
  reviewController.setTourUserIds,
  reviewController.createReview
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(
    // authController.protect,
    // authController.restrictTo('user'),
    reviewController.deleteReview
  );

module.exports = router;
