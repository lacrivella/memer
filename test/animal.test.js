require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Animal = require('../lib/models/Animal');

describe('animal routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('POST an animal', () => {
    return request(app)
      .post('/api/v1/animals')
      .send({ 
        name: 'sloth',
        color: 'grey',
        extinct: 'no'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'sloth',
          color: 'grey',
          extinct: 'no',
          __v: 0
        });
      });
  });
  it('GET all the animals', async() => {
    const animal = await Animal.create({ name: 'peacock', color: 'cobalt', extinct: 'no' });
    return request(app)
      .get('/api/v1/animals')
      .then(res => {
        const animalJSON = JSON.parse(JSON.stringify(animal));
        expect(res.body).toEqual([animalJSON]);
      });
  });

});


