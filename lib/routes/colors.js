const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name
    } = req.body;

    Color
      .create({ name })
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Color
      .find()
      .then(colors => res.send(colors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .then(color => res.send(color))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Color
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .then(color => res.send(color))
      .catch(next);
  });
