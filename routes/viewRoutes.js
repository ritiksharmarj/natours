const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(viewsController.getOverview);
router
  .route('/tour/:slug')
  .get(authController.protect, viewsController.getTour);
router.route('/login').get(viewsController.getLoginForm);

module.exports = router;
