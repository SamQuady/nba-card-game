const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const db = require('./db/connection.js');

app.use(cors());
app.use(express.static('public'));

app.get('/api/:playerId', (req, res) => {
  let player = req.params.playerId;
  db.playerCardDataGetter(player, (err, data) => {
    if (err) {
      console.log('GET ERROR', err);
      res.status(400).send(err).end();
    } else {
        res.status(200).send(data).end();

    }
  })
})

app.listen(port, () => {
  console.log('server is now listening on port ' + port);
})