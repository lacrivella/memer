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
  });
  