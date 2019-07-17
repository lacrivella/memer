const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/memes', require('./routes/memes'));

//extra credit routes
app.use('/api/v1/animals', require('./routes/animals'));
app.use('/api/v1/foods', require('./routes/foods'));
app.use('/api/v1/colors', require('./routes/colors'));
app.use('/api/v1/shows', require('./routes/shows'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
