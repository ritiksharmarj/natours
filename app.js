const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware (stands between middle of the request and the response)
app.use(morgan('dev'));
app.use(express.json());

// Our own middleware function
app.use((req, res, next) => {
   console.log('Hello from the middleware 👋');
   next();
});

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
         tours,
      },
   });
};

const getTour = (req, res) => {
   const id = +req.params.id;
   const tour = tours.find((el) => el.id === id);

   // If there is no tour (id > tours.length)
   if (!tour)
      return res.status(404).json({
         status: 'fail',
         message: 'Invalid ID',
      });

   res.status(200).json({
      status: 'success',
      data: {
         tour,
      },
   });
};

const updateTour = (req, res) => {
   if (+req.params.id > tours.length)
      return res.status(404).json({
         status: 'fail',
         message: 'Invalid ID',
      });

   res.status(200).json({
      status: 'success',
      data: {
         tour: '<Updated tour here...>',
      },
   });
};

const deleteTour = (req, res) => {
   if (+req.params.id > tours.length)
      return res.status(404).json({
         status: 'fail',
         message: 'Invalid ID',
      });

   // we don't send any data back
   res.status(204).json({
      status: 'success',
      data: null,
   });
};

const createTour = (req, res) => {
   //  console.log(req.body);

   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({ id: newId }, req.body);

   tours.push(newTour);

   fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
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

// Fetch tours from the server (Get request - from the server to the client)
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// Update the partial data using PATCH request
// app.patch('/api/v1/tours/:id', updateTour);

// Delete the partial data using DELETE request
// app.delete('/api/v1/tours/:id', deleteTour);

// Create a new tour (Post request - from the client to the server)
// app.post('/api/v1/tours', createTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id')
   .get(getTour)
   .patch(updateTour)
   .delete(deleteTour);

// Create a server on 127.0.0.1:8000
app.listen(8000, () => {
   console.log('App running');
});
