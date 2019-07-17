const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/memes', require('./routes/memes'));

//extra credit routes
app.use('/api/v1/animals', require('./routes/animals'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
