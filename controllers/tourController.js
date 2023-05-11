const Tour = require('../models/tourModel');

/**
 * @description - Get All Tours
 * @route - GET /api/v1/tours
 */
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    /////////////////////////////////
    // 1A - Filtering: extract filters from query string
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    /////////////////////////////////
    // 1B - Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq|ne)\b/g,
      (match) => `$${match}`
    ); // queryStr: { 'duration': { '$gte': '3' }}

    // Build query
    let query = Tour.find(JSON.parse(queryStr));

    /////////////////////////////////
    // 2 - Sorting
    if (req.query.sort) {
      /**
       * /api/v1/tours?sort=price,-ratingsAverage
       * sorting the tours by "price" in ascending order
       * "ratingsAverage" in descending order (denoted by the "-" before "ratingsAverage")
       *
       * equivalent - query.sort('price -ratingsAverage');
       */
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // If sort field empty then results should be sorted in descending order to show the newest document first.
      query = query.sort('-createdAt');
    }

    /////////////////////////////////
    // 3 - Field limiting
    if (req.query.fields) {
      /**
       * /api/v1/tours?fields=name,duration,difficulty,price
       * In this case, the response will only include the "name", "duration", "difficulty", and "price" fields, rather than returning all the fields of the tours resource.
       *
       * equivalent - query.select('name duration difficulty price');
       */
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    /////////////////////////////////
    // 3 - Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // Execute query
    const tours = await query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

/**
 * @description - Get Tour (Single)
 * @route - GET /api/v1/tours/:id
 */
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
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
      message: error.message,
    });
  }
};

/**
 * @description - Update Tour
 * @route - PATCH /api/v1/tours/:id
 */
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the modified document rather than the original
      runValidators: true, // validate the update operation against the model's schema
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

/**
 * @description - Delete Tour
 * @route - DELETE /api/v1/tours/:id
 */
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
