const fs = require('fs');
const express = require('express');

const app = express();

// middleware (stands between middle of the request and the response)
app.use(express.json());

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Fetch tours from the server (Get request - from the server to the client)
app.get('/api/v1/tours', (req, res) => {
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
         tours,
      },
   });
});

// Create a new tour (Post request - from the client to the server)
app.post('/api/v1/tours', (req, res) => {
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
});

// Create a server on 127.0.0.1:8000
app.listen(8000, () => {
   console.log('App running');
});
