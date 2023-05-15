class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    // If the "statusCode" starts with the "4" then it's "fail" otherwise "error"
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
