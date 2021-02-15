const { Client } = require('pg');
const postgresRole = 'samquady';

const client = new Client({
  user: postgresRole,
  host: 'localhost',
  database: 'showdown',
  password: 'password',
  port: 5432
});

client.connect();

const createPlayerTable = `
CREATE TABLE IF NOT EXISTS players (
  id int,
  first_name varchar,
  last_name varchar,
  position varchar,
  height_feet int,
  height_inches int,
  weight_pounds int,
  PRIMARY KEY (id)
);
`;

const createStatsTable = `
CREATE TABLE IF NOT EXISTS stats (
  games_played int,
  player_id int,
  season int,
  min varchar,
  fgm real,
  fga real,
  fg3m real,
  fg3a real,
  ftm real,
  fta real,
  oreb real,
  dreb real,
  reb real,
  ast real,
  stl real,
  blk real,
  turnover real,
  pf real,
  pts real,
  fg_pct real,
  fg3_pct real,
  ft_pct real,
  CONSTRAINT fk_player
    FOREIGN KEY(player_id)
      REFERENCES players(id)
);
`;

const createTeamsTable = `
CREATE TABLE IF NOT EXISTS teams (
  id int,
  abbreviation varchar,
  city varchar,
  conference varchar,
  division varchar,
  full_name varchar,
  name varchar,
  PRIMARY KEY (id)
)
`;

module.exports = {
  client
}