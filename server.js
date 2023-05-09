const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

// MongoDB database connection
const uri = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful 🖐'));

// Create a server on 127.0.0.1:8000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started ${port} 🖐`);
});
