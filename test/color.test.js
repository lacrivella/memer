require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Color = require('../lib/models/Color');

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
  
  it('get all colors', async() => {
    const color = await Color.create({ name: 'red' });
    return request(app)
      .get('/api/v1/colors')
      .then(res => {
        const colorJSON = JSON.parse(JSON.stringify(color));
        expect(res.body).toEqual([colorJSON]);
      });
  });

  it('get by id', async() => {
    const color = await Color.create({ name: 'red' });
    return request(app)
      .get(`/api/v1/colors/${color._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'red',
          __v: 0
        });
      });
  });

  it('put color', async() => {
    const color = await Color.create({ name: 'yellow' });
    return request(app)
      .put(`/api/v1/colors/${color._id}`)
      .send({ name: 'purple' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'purple',
          __v: 0
        });
      });
  });
});