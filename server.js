require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
