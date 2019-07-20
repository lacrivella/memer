require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Show = require('../lib/models/Show');

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

  it('get all shows', async() => {
    const show = await Show.create({ title: 'hannibal', seasons: 4, channel: 'nbc' });
    return request(app)
      .get('/api/v1/shows')
      .then(res => {
        const showJSON = JSON.parse(JSON.stringify(show));
        expect(res.body).toEqual([showJSON]);
      });
  });

  it('get show by id', async() => {
    const show = await Show.create({ title: 'hannibal', seasons: 4, channel: 'nbc'});
    return request(app)
      .get(`/api/v1/shows/${show._id}`)
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

  it('put show', async() => {
    const show = await Show.create({ title: 'hannibal', seasons: 4, channel: 'nbc' });
    return request(app)
      .put(`/api/v1/shows/${show._id}`)
      .send({
        title: 'dark',
        seasons: 2,
        channel: 'netflix'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'dark',
          seasons: 2,
          channel: 'netflix',
          __v: 0
        });
      });
  });

  it('deltes show', async() => {
    const show = await Show.create({ title: 'game of thrones', seasons: 8, channel: 'hbo' });
    return request(app)
      .delete(`/api/v1/shows/${show._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'game of thrones',
          seasons: 8,
          channel: 'hbo',
          __v: 0
        });
      });
  });
});
