const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
