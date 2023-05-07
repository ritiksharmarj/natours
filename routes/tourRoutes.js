const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
} = require('../controllers/tourController');

const router = express.Router();

// Param Middleware - Check if "ID" isn't available return "fail"
router.param('id', checkID);

// Implementing the "tours" routes
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
