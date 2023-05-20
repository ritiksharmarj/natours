const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// Alias
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

// Routes for aggregation operations
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

// Implementing the "tours" routes
router.route('/').get(protect, getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
