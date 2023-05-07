import { readFileSync, writeFile } from 'fs';
import express from 'express';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Read the tours file JSON data
const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

// GET - Get All Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// GET - Get Tour
const getTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// POST - Create New Tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  writeFile(
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

// PATCH - Update Tour
const updateTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = Object.assign(tour, req.body);

  writeFile(
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

// DELETE - Delete Tour
const deleteTour = (req, res) => {
  const tourId = +req.params.id;
  const tour = tours.find((el) => el.id === tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tourIndex = tours.findIndex((el) => el.id === tourId);
  tours.splice(tourIndex, 1);

  writeFile(
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

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Create a server on 127.0.0.1:8000
app.listen(8000, () => {
  console.log('Server started 🖐');
});
