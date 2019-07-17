require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('color route', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('post a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({ name: 'blue' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'blue',
          __v: 0
        });
      });
  }); 
});
