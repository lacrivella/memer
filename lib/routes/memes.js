const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  //POST
  .post('/', (req, res, next) => {
    const {
      top,
      image,
      bottom
    } = req.body;

    Meme
      .create({ top, image, bottom })
      .then(meme => res.send(meme))
      .catch(next);
  })

  //GET ALL
  .get('/', (req, res, next) => {
    Meme
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  })

  //GET ID
  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  })

  //PUT
  .put('/:id', (req, res, next) => {
    Meme
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedMeme => res.send(updatedMeme))
      .catch(next);
  });

  //DELETE