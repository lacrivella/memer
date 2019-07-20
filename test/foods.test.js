require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Food = require('../lib/models/Food');

describe('food routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  //post
  it('post new food', () => {
    return request(app)
      .post('/api/v1/foods')
      .send({ name: 'pasta', tasty: 8, description: 'nom nom' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'pasta',
          tasty: 8,
          description: 'nom nom',
          __v: 0
        });
      });
  });
  //get all
  it('get all food', async() => {
    const food = await Food.create({ name: 'icecream', tasty: 9, description: 'sweet' });
    return request(app)
      .get('/api/v1/foods')
      .then(res => {
        const foodJSON = JSON.parse(JSON.stringify(food));
        expect(res.body).toEqual([foodJSON]);
      });
  });
  //get id
  it('get food by id', async() => {
    const food = await Food.create({ name: 'icecream', tasty: 9, description: 'sweet' });
    return request(app)
      .get(`/api/v1/foods/${food._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'icecream',
          tasty: 9,
          description: 'sweet',
          __v: 0
        });
      });
  });
  //put
  it('put to update food', async() => {
    const food = await Food.create({ name: 'salad', tasty: 4, description: 'leafy' });
    return request(app)
      .put(`/api/v1/foods/${food._id}`)
      .send({ name: 'cherry', tasty: 7, description: 'fruity' })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          name: 'cherry',
          tasty: 7,
          description: 'fruity',
          __v: 0
        });
      });
  });
  //delete
  it('deletes a food item', async() => {
    const food = await Food.create({ name: 'tomato', tasty: 1, description: 'ew' });

    return request(app)
      .delete(`/api/v1/foods/${food._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'tomato',
          tasty: 1,
          description: 'ew',
          __v: 0
        });
      });
  });   
});

