const { Router } = require('express');
const Show = require('../models/Show');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      seasons,
      channel
    } = req.body;

    Show
      .create({ title, seasons, channel })
      .then(show => res.send(show))
      .catch(next);
  });