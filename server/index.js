const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const db = require('./db/connection.js');

app.use(cors());
app.use(express.static('public'));

app.listen(port, () => {
  console.log('server is now listening on port ' + port);
})