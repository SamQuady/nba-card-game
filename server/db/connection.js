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

const dumpTeamsTable = `
DROP TABLE IF EXISTS teams;
`;

const dumpPlayerTable = `
DROP TABLE IF EXISTS players;
`;

const dumpStatsTable = `
DROP TABLE IF EXISTS stats;
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

const createPlayerTable = `
CREATE TABLE IF NOT EXISTS players (
  id int,
  first_name varchar,
  last_name varchar,
  position varchar,
  height_feet int,
  height_inches int,
  weight_pounds int,
  team int,
  PRIMARY KEY (id),
  CONSTRAINT fk_player
  FOREIGN KEY(team)
    REFERENCES teams(id)
);
`;

const createStatsTable = `
CREATE TABLE IF NOT EXISTS stats (
  games_played int,
  player_id int,
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

const copyTeams =  `
COPY teams
FROM '/Users/samquady/Work/mvp/nba-app/server/db/csv-data/team-records.csv'
DELIMITER ','
CSV HEADER;
`;

const copyPlayers = `
COPY players
FROM '/Users/samquady/Work/mvp/nba-app/server/db/csv-data/player-records.csv'
DELIMITER ','
CSV HEADER;
`;

const copyStats = `
COPY stats
FROM '/Users/samquady/Work/mvp/nba-app/server/db/csv-data/player-stats.csv'
DELIMITER ','
CSV HEADER;
`;

const playerQuery = `SELECT * FROM players WHERE id = `;

const statsQuery = `SELECT * FROM stats WHERE player_id = `;

const teamQuery = `SELECT * FROM teams WHERE id = `;

const oppPlayerQuery = `SELECT * FROM players WHERE team = `;

// -------Front Facing Records Query----------//
const playerCardDataGetter = (id, cb) => {
  let data = {};
  let teamId = 0;
  pool.query(playerQuery + id, (err, playerRes) => {
    if (err) {
      console.log(err);
    } else {
      teamId = playerRes.rows[0].team;
      data.player = playerRes.rows[0];
      pool.query(statsQuery + id, (err, statsRes) => {
        if (err) {
          console.log(err);
        } else {
          data.stats = statsRes.rows[0];
          pool.query(teamQuery + teamId, (err, teamRes) => {
            if (err) {
              console.log(err);
            } else {
              data.team = teamRes.rows[0];
              cb(null, data);
            }
          })
        }
      })
    }
  })
}

const teamGetter = (id, cb) => {
  let data = [];
  pool.query(oppPlayerQuery + id, (err, playerRes) => {
    if (err) {
      console.log(err);
    } else {
      let playerRecords = playerRes.rows;
      for (let index = 0; index < playerRecords.length; index ++) {
        let record = [];
        record.push(playerRecords[index]);
        pool.query(statsQuery + playerRecords[index].id, (err, statsRes) => {
          if (err) {
            console.log(err);
          } else {
            record.push(statsRes.rows[0]);
            pool.query(teamQuery + id, (err, teamRes) => {
              if (err) {
                console.log(err);
              } else {
                record.push(teamRes.rows[0]);
                data.push(record);
                if (data.length === playerRecords.length) {
                  cb(null, data);
                }
              }
            })
          }
        })
      }
    }
  })
}


//-------Dropping Tables Queries-----------//

client
  .query(dumpStatsTable)
  .then(res => {
    console.log('dumped stats table')
  })
  .catch(err => {
    console.log('could not dump stats table', err)
  })

client
  .query(dumpPlayerTable)
  .then(res => {
    console.log('dumped players table')
  })
  .catch(err => {
    console.log('could not dump players table', err)
  })

client
  .query(dumpTeamsTable)
  .then(res => {
    console.log('dumped teams table')
  })
  .catch(err => {
    console.log('could not dump teams table', err)
  })

//-------Creating Tables Queries-----------//

client
  .query(createTeamsTable)
  .then(res => {
    console.log('created teams table')
  })
  .catch(err => {console.log('could not create teams table', err)})
client
  .query(createPlayerTable)
  .then(res => {
    console.log('created players table')
  })
  .catch(err => {console.log('could not create players table', err)})
client
  .query(createStatsTable)
  .then(res => {
    console.log('created stats table')
  })
  .catch(err => {console.log('could not create stats table', err)})

//-------Copying Data into Tables Queries-----------//

client
  .query(copyTeams)
  .then(res => {
    console.log('copied teams')
  })
  .catch(err => {
    console.log('could not copy teams', err)
  })
client
  .query(copyPlayers)
  .then(res => {
    console.log('copied players')
  })
  .catch(err => {
    console.log('could not copy players', err)
  })
client
  .query(copyStats)
  .then(res => {
    console.log('copied stats')
  })
  .catch(err => {
    console.log('could not copy stats', err)
  })
  .then(() => client.end())

//--------------Opening Pool Connection for Front Facing Access-------//

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'showdown',
  port: 5432
});

pool
  .connect()
  .then(() => {
    console.log('Pool Connected')
  })
  .catch(err => {
    console.log('Pool Connection Error', err)
  })

module.exports = {
  client,
  pool,
  playerCardDataGetter,
  teamGetter
}