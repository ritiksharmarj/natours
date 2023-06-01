const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

/**
 * @description - Delete [Model]
 * @route - DELETE /api/v1/[route-name]/:id
 *
 * @param {Array} Model - MongoDB collection
 * @returns null
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

/**
 * @description - Update [Model]
 * @route - PATCH /api/v1/[route-name]/:id
 *
 * @param {Array} Model - MongoDB collection
 * @returns updated model
 */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the modified document rather than the original
      runValidators: true, // validate the update operation against the model's schema
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * @description - Create [Model]
 * @route - POST /api/v1/[route-name]/:id
 *
 * @param {Array} Model - MongoDB collection
 * @returns created model
 */
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Creating new document and saving to the database
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * @description - Get [Model] (Single)
 * @route - GET /api/v1/[route-name]/:id
 *
 * @param {Array} Model - MongoDB collection
 * @param {Object} popOptions - https://mongoosejs.com/docs/populate.html
 * @returns model data
 */
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * @description - Get ALl [Model]
 * @route - GET /api/v1/[route-name]
 *
 * @param {Array} Model - MongoDB collection
 * @returns models data
 */
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // Execute query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
