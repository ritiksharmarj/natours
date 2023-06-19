const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.route('/').get(authController.isLoggedIn, viewsController.getOverview);
router
  .route('/tour/:slug')
  .get(authController.isLoggedIn, viewsController.getTour);
router
  .route('/login')
  .get(authController.isLoggedIn, viewsController.getLoginForm);
router
  .route('/signup')
  .get(authController.isLoggedIn, viewsController.getSignupForm);
router.route('/me').get(authController.protect, viewsController.getAccount);
router
  .route('/my-bookings') // booked tours of current user
  .get(authController.protect, viewsController.getMyBookings);

// router
//   .route('/submit-user-data')
//   .post(authController.protect, viewsController.updateUserData);

module.exports = router;
