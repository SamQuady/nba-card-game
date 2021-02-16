const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./db/connection.js');

app.use(cors());

app.listen(port, () => {
  console.log('server is now listening on port ' + port);
})