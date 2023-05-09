const mongoose = require('mongoose');

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

module.exports = Tour;
