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
  });