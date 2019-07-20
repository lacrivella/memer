const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  //name
  name: {
    type: String,
    required: true
  },
  //tasty
  tasty: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  //description
  description: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

