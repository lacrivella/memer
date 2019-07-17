require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('show routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('post show', () => {
    return request(app)
      .post('/api/v1/shows')
      .send({ title: 'hannibal', seasons: 4, channel: 'nbc' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'hannibal',
          seasons: 4,
          channel: 'nbc',
          __v: 0
        });
      });
  });
});