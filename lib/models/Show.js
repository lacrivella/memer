const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  //title
  title: {
    type: String,
    required: true,
  },
  //seasons
  seasons: {
    type: Number,
    required: true
  },
  //channel
  channel: {
    type: String,
    required: true
  }
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
