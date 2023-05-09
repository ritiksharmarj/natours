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

// Defining schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // specify the error that we want to be displayed when we're missing this field.
    unique: true, // we can't have two tour documents with the same name.
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Creating a model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Sea Explorer',
  rating: 4.8,
  price: 497,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(`ERROR 💥 : ${err}`));

// Create a server on 127.0.0.1:8000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started ${port} 🖐`);
});
