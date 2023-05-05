import express from 'express';

const app = express();

// Routing
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

// Create a server on 127.0.0.1:8000
app.listen(8000, () => {
  console.log('Server started 🖐');
});
