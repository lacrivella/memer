require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
});
