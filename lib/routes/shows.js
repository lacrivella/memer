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
  })
  .get('/', (req, res, next) => {
    Show
      .find()
      .then(shows => res.send(shows))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Show
      .findById(req.params.id)
      .then(show => res.send(show))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Show
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedShow => res.send(updatedShow))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Show
      .findByIdAndDelete(req.params.id)
      .then(show => res.send(show))
      .catch(next);
  });
  