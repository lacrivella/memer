const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      color,
      extinct
    } = req.body;

    Animal
      .create({ name, color, extinct })
      .then(animal => res.send(animal))
      .catch(next)
  })
  .get('/', (req, res, next) => {
    Animal
      .find()
      .then(animals => res.send(animals))
      .catch(next);
  });
