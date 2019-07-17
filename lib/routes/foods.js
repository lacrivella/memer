const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router()
  //post
  .post('/', (req, res, next) => {
    const {
      name,
      tasty,
      description
    } = req.body;

    Food
      .create({ name, tasty, description })
      .then(food => res.send(food))
      .catch(next);
  })
  //get all
  .get('/', (req, res, next) => {
    Food
      .find()
      .then(foods => res.send(foods))
      .catch(next);
  })
  //get id
  .get('/:id', (req, res, next) => {
    Food
      .findById(req.params.id)
      .then(food => res.send(food))
      .catch(next);
  })
  //put
  .put('/:id', (req, res, next) => {
    Food
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedFood => res.send(updatedFood))
      .catch(next);
  })
  //delete
  .delete('/:id', (req, res, next) => {
    Food
      .findByIdAndDelete(req.params.id)
      .then(food => res.send(food))
      .catch(next);
  });

