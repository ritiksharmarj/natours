const Tour = require('../models/tourModel');

/**
 * @description - Get All Tour
 * @route - GET /api/v1/tours
 */
exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};

/**
 * @description - Get Tour (Single)
 * @route - GET /api/v1/tours/:id
 */
exports.getTour = (req, res) => {
  // const tourId = +req.params.id;
  // const tour = tours.find((el) => el.id === tourId);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

/**
 * @description - Create New Tour
 * @route - POST /api/v1/tours
 */
exports.createTour = async (req, res) => {
  try {
    // Creating new document and saving to the database
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

/**
 * @description - Update Tour
 * @route - PATCH /api/v1/tours/:id
 */
exports.updateTour = (req, res) => {
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     tour: updatedTour,
  //   },
  // });
};

/**
 * @description - Delete Tour
 * @route - DELETE /api/v1/tours/:id
 */
exports.deleteTour = (req, res) => {
  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
};
