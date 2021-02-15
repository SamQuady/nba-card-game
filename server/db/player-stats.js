const axios = require('axios');
const csvWriteControllers = require('./csv-write-controllers.js');

const playerStats = [];

const players = 493;

const getRoute = 'https://www.balldontlie.io/api/v1/players/'

const statGetter = () => {
  for (let index = 1; index <= players; index ++) {
    axios.get(getRoute + index)
      .then((res) => {
        playerStats.push(response);
      })
      .catch((err) => {
        console.log('get stats error', err);
      })
  }
  csvWriteControllers.csvWriteStats
    .writeRecords(playerStats)
};

statGetter();