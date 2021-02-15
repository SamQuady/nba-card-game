const csvWriter = require('csv-writer');

const csvWritePlayers = csvWriter.createObjectCsvWriter({
  path: 'server/db/csv-data/player-records.csv',
  append: false,
  header: [
    {id: 'id', title: 'id'},
    {id: 'first_name', title: 'first_name'},
    {id: 'last_name', title: 'last_name'},
    {id: 'position', title: 'position'},
    {id: 'height_feet', title: 'height_feet'},
    {id: 'height_inches', title: 'height_inches'},
    {id: 'weight_pounds', title: 'weight_pounds'}
  ]
});

const csvWriteStats = csvWriter.createObjectCsvWriter({
  path: 'server/db/csv-data/player-stats.csv',
  append: false,
  header: [
    {id: 'games_played', title: 'games_played'},
    {id: 'player_id', title: 'player_id'},
    {id: 'min', title: 'min'},
    {id: 'fgm', title: 'fgm'},
    {id: 'fga', title: 'fga'},
    {id: 'fg3m', title: 'fg3m'},
    {id: 'fg3a', title: 'fg3a'},
    {id: 'ftm', title: 'ftm'},
    {id: 'fta', title: 'fta'},
    {id: 'oreb', title: 'oreb'},
    {id: 'dreb', title: 'dreb'},
    {id: 'reb', title: 'reb'},
    {id: 'ast', title: 'ast'},
    {id: 'stl', title: 'stl'},
    {id: 'blk', title: 'blk'},
    {id: 'turnover', title: 'turnover'},
    {id: 'pf', title: 'pf'},
    {id: 'pts', title: 'pts'},
    {id: 'fg_pct', title: 'fg_pct'},
    {id: 'fg3_pct', title: 'fg3_pct'},
    {id: 'ft_pct', title: 'ft_pct'}
  ]
});

const csvWriteTeams = csvWriter.createObjectCsvWriter({
  path: 'server/db/csv-data/team-records.csv',
  append: false,
  header: [
    {id: 'id', title: 'id'},
    {id: 'abbreviation', title: 'abbreviation'},
    {id: 'city', title: 'city'},
    {id: 'conference', title: 'conference'},
    {id: 'division', title: 'division'},
    {id: 'full_name', title: 'full_name'},
    {id: 'name', title: 'name'}
  ]
});

module.exports = {
  csvWritePlayers,
  csvWriteStats,
  csvWriteTeams
};