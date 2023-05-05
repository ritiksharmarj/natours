import { readFileSync, writeFile } from 'fs';
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Read the tours file JSON data
const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

// GET - Get all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// GET - Get tour
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// POST - Create new tour
app.post('/api/v1/tours', (req, res) => {
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
});

// PATCH - Update tour
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// DELETE - Delete tour
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

// Create a server on 127.0.0.1:8000
app.listen(8000, () => {
  console.log('Server started 🖐');
});
