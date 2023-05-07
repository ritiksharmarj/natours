const fs = require('fs');

// Read the tours file JSON data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Param Middleware - Check if "ID" isn't valid return "fail"
exports.checkID = (req, res, next, val) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// Middleware to check before create new tour that there should be name and price
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

/**
 * @description - Get All Tour
 * @route - GET /api/v1/tours
 */
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

/**
 * @description - Get Tour (Single)
 * @route - GET /api/v1/tours/:id
 */
exports.getTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

/**
 * @description - Create New Tour
 * @route - POST /api/v1/tours
 */
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

/**
 * @description - Update Tour
 * @route - PATCH /api/v1/tours/:id
 */
exports.updateTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  const updatedTour = Object.assign(tour, req.body);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

/**
 * @description - Delete Tour
 * @route - DELETE /api/v1/tours/:id
 */
exports.deleteTour = (req, res) => {
  const tourId = +req.params.id;

  const tourIndex = tours.findIndex((el) => el.id === tourId);
  tours.splice(tourIndex, 1);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
