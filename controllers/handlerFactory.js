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
