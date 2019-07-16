require('dotenv').config();

const app = require('./lib/app');

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
