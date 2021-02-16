const axios = require('axios');
const csvWriteControllers = require('./csv-write-controllers.js');

const players = 493;


const playerGetter = (startIn) => {

  let route = 'https://www.balldontlie.io/api/v1/players/';

  let dataHolder = [];

  for (let index = startIn; index <= startIn + 25; index ++) {
    axios.get(route + index)
    .then((res) => {
      let record = res.data;
      let team_id = res.data.team.id;
      record.team = team_id;
      dataHolder.push(record);
      if (dataHolder.length === 25) {
        dataHolder.sort((a, b) => {
          return a.id - b.id;
        });
        csvWriteControllers.csvWritePlayers
          .writeRecords(dataHolder);
      }
    })
    .catch((err) => {
      console.log('get stats error', err);
    })
  }
}

playerGetter(1)