const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/////////////////////////////////
// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // to accept JSON data
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

/////////////////////////////////
// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling unhandled routes - routes which we haven't defined yet e.g. /api/tours
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
