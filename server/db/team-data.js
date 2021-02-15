const csvWriteControllers = require('./csv-write-controllers.js');

const abbreviations = [
  'ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'SF', 'HOU', 'IND', 'LAQ', 'LAD', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'
];

const cities = [
  'Atlanta', 'Boston', 'Brooklyn', 'Charlotte', 'Chicago', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'San Francisco', 'Houston', 'Indiana', 'Los Angeles', 'Los Angeles', 'Memphis', 'Miami', 'Milwaukee', 'Minnesota', 'New Orleans', 'New York', 'Oklahoma City', 'Orlando', 'Philladelphia', 'Phoenix', 'Portland', 'Sacramento', 'San Antonio', 'Toronto', 'Utah', 'Washington'
];

const conferences = ['West', 'East'];

const divisions = ['Atlantic', 'Central', 'Southeast', 'Northwest', 'Pacific', 'Southwest'];

const names = [
  'Peaches', 'Dunkers', 'Lofts', 'Queens', 'Wind', 'Rust', 'Derricks', 'Demon Horses', 'Gaskets', 'Start Ups', 'Astronauts', 'Scrappers', 'Quakes', 'Daytime Dramas', 'Blues', 'Monsoons', 'Beer Brats', 'Blizzard', 'Voodoo', 'Barons', 'Bison', 'Mice', 'Cheese Whiz', 'Cactus', 'Roses', 'Prospectors', 'Alamos', 'Foreigners', 'Arches', 'Statues'
];

const conferenceCheck = (id) => {
  let result = '';
  let westTeams = [7, 8, 10, 11, 13, 14, 15, 18, 19, 21, 24, 25, 26, 27, 29];
  let eastTeams = [1, 2, 3, 4, 5, 6, 9, 12, 16, 17, 20, 22, 23, 28, 30];
  if (westTeams.indexOf(id) === - 1) {
    result = 'East';
  } else {
    result = 'West';
  }
  return result;
}

const divisionCheck = (id) => {
  let result = '';
  let atlanticTeams = [23, 3, 2, 20, 28];
  let centralTeams = [17, 12, 5, 6, 9];
  let southeastTeams = [1, 4, 16, 22, 30];
  let northwestTeams = [29, 25, 8, 21, 18];
  let pacificTeams = [14, 13, 24, 10, 26];
  let southWestTeams = [7, 11, 15, 19, 27];

  if (atlanticTeams.indexOf(id) >= 0) {
    result = 'Atlantic';
  } else if (centralTeams.indexOf(id) >= 0) {
    result = 'Central';
  } else if (southeastTeams.indexOf(id) >= 0) {
    result = 'Southeast';
  } else if (northwestTeams.indexOf(id) >= 0) {
    result = 'Northwest';
  } else if (pacificTeams.indexOf(id) >= 0) {
    result = 'Pacific';
  } else {
    result = 'Southwest';
  }
  return result;
}



const teamDataCreation = () => {

  let teamHolder = [];

  for (let index = 1; index < 31; index ++) {
    let teamInfo = {};
    teamInfo.id = index;
    teamInfo.abbreviation = abbreviations[index - 1];
    teamInfo.city = cities[index - 1];
    teamInfo.conference = conferenceCheck(index);
    teamInfo.division = divisionCheck(index);
    teamInfo.full_name = teamInfo.city + ' ' + names[index - 1];
    teamInfo.name = names[index - 1];
    teamHolder.push(teamInfo);
  }
  csvWriteControllers.csvWriteTeams
    .writeRecords(teamHolder);
}

teamDataCreation();