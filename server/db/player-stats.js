const axios = require('axios');
const csvWriteControllers = require('./csv-write-controllers.js');

const players = 493;


const statGetter = () => {

  let route = 'https://www.balldontlie.io/api/v1/season_averages?';

  let queryAddition = 'player_ids[]=';

  for (let index = 1; index <= players; index ++) {

    let queryParams = '';
    if (index < players) {
      queryParams = queryAddition + index + '&';
    } else {
      queryParams = queryAddition + index;
    }
    route += queryParams;
  }

  axios.get(route)
    .then((res) => {
      csvWriteControllers.csvWriteStats
        .writeRecords(res.data.data);
    })
    .catch((err) => {
      console.log('get stats error', err);
    })
};

statGetter();