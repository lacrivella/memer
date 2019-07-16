require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('meme routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('POST a new meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ top: 'this is a meme', image: 'url', bottom: 'lolol so funny' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'this is a meme',
          image: 'url',
          bottom: 'lolol so funny',
          __v: 0
        });
      });
  }); 
});
