const axios = require('axios');
const csvWriteControllers = require('./csv-write-controllers.js');

const players = 493;

const wait = (ms) => {
  console.log('waiting');
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}

const playerGetter = () => {

  let route = 'https://www.balldontlie.io/api/v1/players/';

  let dataHolder = [];

  for (let index = 1; index <= 100; index ++) {
    if (index % 10 === 0) {
      wait(10000);
    }
    axios.get(route + index)
    .then((res) => {
      dataHolder.push(res.data);
      if (dataHolder.length === 100) {
        csvWriteControllers.csvWritePlayers
          .writeRecords(dataHolder);
      }
    })
    .catch((err) => {
      console.log('get stats error', err);
    })
  }
}

playerGetter();