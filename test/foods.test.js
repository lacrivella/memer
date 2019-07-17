require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
   
});