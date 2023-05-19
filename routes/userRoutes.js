const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Auth routers
router.route('/signup').post(signup);
router.route('/login').post(login);

// Implementing the "users" routes
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
