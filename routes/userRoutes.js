const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Auth routes
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router
  .route('/updateMyPassword')
  .patch(authController.protect, authController.updatePassword);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getUser);

router
  .route('/updateMe')
  .patch(authController.protect, userController.updateMe);

router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);

// Implementing the "users" routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
