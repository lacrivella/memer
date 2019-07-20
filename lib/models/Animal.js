const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  extinct: {
    type: String,
    required: true,
    maxlength: 3
  }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
