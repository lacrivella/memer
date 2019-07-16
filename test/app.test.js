require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

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

  it('GET all memes', async() => {
    const meme = await Meme.create({ top: 'this is a meme', image: 'url', bottom: 'lolol so funny' });
    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('GET meme by ID', async() => {
    const meme = await Meme.create({ top: 'more meme', image: 'url', bottom: 'hilarious' });
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'more meme',
          image: 'url',
          bottom: 'hilarious',
          __v: 0
        });
      });
  });
});
