const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;