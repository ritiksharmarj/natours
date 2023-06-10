const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.isLoggedIn, viewsController.getOverview);
router
  .route('/tour/:slug')
  .get(authController.isLoggedIn, viewsController.getTour);
router
  .route('/login')
  .get(authController.isLoggedIn, viewsController.getLoginForm);
router.route('/me').get(authController.protect, viewsController.getAccount);

module.exports = router;
