import React from 'react';
import CardView from './card-view.jsx';
import MinAdjCardView from './minutes-adjust-card-view.jsx';
import styled from 'styled-components';

const CardGridContainer = styled.div`
display: grid;
grid-template-columns: 18% 18% 18% 18% 18%;
grid-column-gap: 1%;
grid-row-gap: 2%;
`;

const PlayButtons = styled.button`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(184, 184, 184);
border-width: 1px;
color: rgb(41, 41, 41);
cursor: pointer;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 14px;
font-weight: 400;
height: 34px;
width: auto;
&:hover {box-shadow: inset 0 0 3px #000000;}
`;

const ButtonHolder = styled.div`
margin-top: 30px;
padding-top: 30px;
text-align: center;
`;

const Title = styled.h2`
font-family: Copperplate, fantasy;
font-size: 30px;
text-align: center;
`;

const IntroText = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 20px;
text-align: center;
`;

const WinText = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 30px;
text-align: center;
`;

const OuterCardViewContainer = styled.div`
padding-left: 3.5%;
padding-top: 25px;
`;

const RotationGridContainer = styled.div`
display: grid;
grid-template-columns: 40% 40%
grid-column-gap: 10%;
grid-row-gap: 2%;
`;

const TeamRotationContainer = styled.div`
margin-left: 40%;
`;

const RosterText = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 18px;
text-align: left;
`;





class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selection: true,
      minutesAdj: false,
      rosterView: false,
      gamePreview: false,
      pregameScenario: false,
      gamePage: false,
      data: [],
      teamIndexes: [],
      selectedPlayerRecords: [],
      rotation: [],
      selectedTeamStats: {},
      alottedMinutes: 0,
      loadedOpp: false,
      oppData: [],
      oppInfo: {},
      multiplier: 0,
      oppMultiplier: 0,
      pregameMessage: '',
      teamWins: 0,
      teamLosses: 0
    };
    this.packIdSelection = this.packIdSelection.bind(this);
    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.teamSelectedHandler = this.teamSelectedHandler.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.teamMinutesSelectedHandler = this.teamMinutesSelectedHandler.bind(this);
    this.statsBasedOnSelectedMinutes = this.statsBasedOnSelectedMinutes.bind(this);
    this.handleRosterViewAdvanceClick = this.handleRosterViewAdvanceClick.bind(this);
    this.handlePregameClick = this.handlePregameClick.bind(this);
    this.pregameMessageChooser = this.pregameMessageChooser.bind(this);
    this.handleGameClick = this.handleGameClick.bind(this);
    this.playAgainClick = this.playAgainClick.bind(this);
  }

  packIdSelection() {
    let results = [];
    for (let index = 0; index < 40; index ++) {
      let id = Math.floor(Math.random() * (494 - 1) + 1);
      results.push(id);
    }
    return results;
  }

  cardClickHandler(record) {
    let index = record[0][0].id;
    if (this.state.teamIndexes.indexOf(index) < 0) {
      if (this.state.teamIndexes.length === 12) {
        event.preventDefault();
        alert(`Too Many Players Selected!`);
        return;
      }
      let previous = this.state.teamIndexes;
      previous.push(index);
      let selectedPlayers = this.state.selectedPlayerRecords;
      selectedPlayers.push(record);
      this.setState({teamIndexes: previous, selectedPlayerRecords: selectedPlayers});
    } else {
      let subtracted = this.state.teamIndexes;
      let spliceIndex = subtracted.indexOf(index);
      subtracted.splice(spliceIndex, 1);
      let previouslySelectedPlayers = this.state.selectedPlayerRecords;
      previouslySelectedPlayers.splice(spliceIndex, 1);
      this.setState({teamIndexes: subtracted, selectedPlayerRecords: previouslySelectedPlayers});
    }
  }

  teamSelectedHandler() {
    if (this.state.teamIndexes.length < 12) {
      event.preventDefault();
      alert(`Select 12 Players!`)
    } else {
      this.setState({selection: false, minutesAdj: true});
    }
  }

  handleMinutesChange(event) {
    let minutes = 0;
    let records = this.state.selectedPlayerRecords;
    records[event.target.id][0][3].assignedMinutes = Number(event.target.value);
    for (let index = 0; index < records.length; index ++) {
      minutes += Number(records[index][0][3].assignedMinutes);
    };
    if (minutes > 240) {
      alert(`You Assigned All Available Minutes, Already!`);
    }
    this.setState({selectedPlayerRecords: records, alottedMinutes: minutes});
  }

  teamMinutesSelectedHandler(event) {
    if (this.state.alottedMinutes !== 240) {
      event.preventDefault();
      if (this.state.allotedMinutes > 240) {
        alert(`You Assigned Too Many Minutes to Continue! Subtract Some!`);
      } else {
        alert(`You Haven't Assigned Enough Minutes Yet to Coninue! Add Some More!`);
      }
    } else {
      this.statsBasedOnSelectedMinutes();
      let records = this.state.selectedPlayerRecords;
      records.sort((a, b) => {
        return b[0][3].assignedMinutes - a[0][3].assignedMinutes;
      });
      this.setState({minutesAdj: false, rosterView: true, rotation: records});
    }
  }

  statsBasedOnSelectedMinutes() {
    let records = this.state.selectedPlayerRecords;
    for (let index = 0; index < records.length; index++ ) {
      let calculatedStats = {};
      let categories = Object.keys(records[index][0][1]);
      for (let i = 0; i < categories.length; i ++) {
        calculatedStats[categories[i]] = (records[index][0][4][categories[i]] * records[index][0][3].assignedMinutes);
      }
      records[index][0].push(calculatedStats);
    }
    this.setState({selectedPlayerRecords: records});
  }

  handleRosterViewAdvanceClick(event) {
    this.setState({rosterView: false, gamePreview: true});
    let oppIndex = Math.floor(Math.random() * (31 - 1) + 1);
    fetch('http://localhost:8080/api/team/' + oppIndex)
      .then(result => result.json())
      .then((result) => {
        let colatedInfo = [];
        let opp = result[0][2];
        for (let index = 0; index < result.length; index ++) {
          if (result[index][1] !== null) {
            colatedInfo.push([result[index]]);
          }
        }
        this.setState({loadedOpp: true, oppData: colatedInfo, oppInfo: opp});
      })
  }

  handlePregameClick() {
    let multiplier = Math.floor(Math.random() * (11 - 0) + 0);
    multiplier = ((multiplier - 5) / 10) + 1;
    let oppMultiplier = Math.floor(Math.random() * (11 - 0) + 0);
    oppMultiplier = ((oppMultiplier - 5) / 10) + 1;
    let message = this.pregameMessageChooser(multiplier);
    this.setState({gamePreview: false, pregameScenario: true, multiplier: multiplier, oppMultiplier: oppMultiplier, pregameMessage: message});
  }

  pregameMessageChooser(multiplier) {

    let positiveMessages = [
      'Your team got a great rest last night, they should be ready to play!',
      'Your team\'s pre-game meal was especailly good, and your players are well-fueled for their big game',
      'Your star player studied extra film last night, and helpfully prepped your other players for the game today',
      'Everyone on your team is locked in and ready for the game!',
      'Your team\'s bench players have been working on a new celebration, and they\'ve got everyone exicted for today\'s game',
      'Your opponent got in late last night, and your players know they\'ll have the advantage',
      'Your opponent just played yesterday, and your players think they\'ll be able to get off to a quick start',
      'Your opponent\'s star player is suffering from Covid-19! Your players should be able to romp',
      'It looks like three of your opponent\'s players went clubbing last night, and they won\'t be fully prepared to play!',
      'Your opponent\'s players are feuding, and it looks like they won\'t be working very well together'
    ];

    let negativeMessages = [
      'Oh no, it looks like your team is suffering from a Covid-19 outbreak!',
      'Uh oh, your star player overslept, and is completely unprepared to play!',
      'Oh my! It seems your team\'s pregame meal made half your team horrible ill, the game today will be a real uphill battle!',
      'It looks like your players misread the schedule and prepped for the wrong team!',
      'Your star player sprained his ankle this morning getting out of bed, and he might not be fully movile today!',
      'Goodness! Your entire team is feuding, and they don\'t want to play together at all!',
      'Yikes - a couple of your players stayed in the team\'s ice tub too long after practice, and they can barely move!',
      'It appears your star player\'s ex is dating the star of your opponent, and he\'s a shell of himself today!',
      'Your opponents are coming in today on a roll, and they\'re confident they\'ll be able to roll you',
      'Disaster - your team went out to dinner together last night together, and it appears they had a few too many drinks! A bad case of the wine-flu is afflicting them',
      'Your second best player swears he saw a ghost last night, and he\'s terrified to play tonight!',
      'Looks like your team\'s equipment manager lost your team\'s shoes last night - everyone is going to have to play in socks!'
    ];

    let neutralMessages = [
      'Both teams are well rested and ready to play!',
      'Everyone has been looking forward to and prepping for today\'s game!',
      'Looks like the game tonight will be on national TV, and everyone is excited to play!'
    ];

    let index = 0;
    let message = '';

    if (multiplier > 0) {
      index = Math.floor(Math.random() * (positiveMessages.length - 0) + 0);
      message = positiveMessages[index];
    } else if (multiplier < 0) {
      index = Math.floor(Math.random() * (negativeMessages.length - 0) + 0);
      message = negativeMessages[index];
    } else {
      index = Math.floor(Math.random() * (neutralMessages.length - 0) + 0);
      message = neutralMessages[index];
    }

    return message;

  }

  handleGameClick() {

    let selectedTeamStats = {};
    let selectedOppStats = {};
    let results = {};

    let categories = Object.keys(this.state.rotation[0][0][5]);

    for (let index = 0; index < this.state.rotation.length; index ++) {
      for (let i = 0; i < categories.length; i ++) {
        if (selectedTeamStats[categories[i]] === undefined) {
          selectedTeamStats[categories[i]] = 0;
        }
        selectedTeamStats[categories[i]] += Math.floor(this.state.multiplier * (this.state.rotation[index][0][5][categories[i]]));
      }
    }

    let records = this.state.oppData;
    records.sort((a, b) => {
      return b[0][1].pts - a[0][1].pts;
    });

    for (let j = 0; j < this.state.oppData.length; j ++) {
      for (let k = 0; k < categories.length; k ++) {
        if (selectedOppStats[categories[k]] === undefined) {
          selectedOppStats[categories[k]] = 0;
        }
        selectedOppStats[categories[k]] += Math.floor(this.state.oppMultiplier * (this.state.oppData[j][0][1][categories[k]]));
      }
    }
    results.teamStats = selectedTeamStats;
    results.oppStats = selectedOppStats;
    if (selectedTeamStats.pts >= selectedOppStats.pts) {
      results.decision = 'win';
    } else {
      results.decision = 'lose';
    }
    this.setState({selectedTeamStats: results, pregameScenario: false, gamePage: true});
  }

  playAgainClick() {
    this.setState({
      selection: true,
      gamePage: false,
      selectedPlayerRecords: [],
      rotation: [],
      selectedTeamStats: {},
      alottedMinutes: 0,
      loadedOpp: false,
      oppData: [],
      oppInfo: {},
      multiplier: 0,
      oppMultiplier: 0,
      pregameMessage: ''});
  }

  componentDidMount() {
    //add more robust null elimination, more robust prevention of additional entries upon first selection click
    let ids = this.packIdSelection();
    let colatedInfo = [];
    let selectedIds = [];
    for (let index = 0; index < ids.length; index ++) {
      fetch('http://localhost:3000/api/players/' + ids[index])
        .then(result => result.json())
        .then((result) => {
          let playerId = result.player.id;
          if (selectedIds.indexOf(playerId) < 0) {
            selectedIds.push(playerId);
            if (result.stats !== undefined) {
              result.assignedMinutes = 0;
              let categories = Object.keys(result.stats);
              let perMin = {};
              let minutes = result.stats.min;
              let minutesSplit = minutes.split(':');
              let fractionMinutes = Number(minutesSplit[0]) + (Number(minutesSplit[1]) / 60);
              for (let i = 0; i < categories.length; i++) {
                if (categories[i] === 'min') {
                  perMin.min = 1;
                } else {
                  perMin.[categories[i]] = (result.stats[categories[i]] / fractionMinutes);
                }
              }
              result.perMin = perMin;
              colatedInfo.push(result);
            }
          }
          if (index === ids.length - 1) {
            let selectedData = colatedInfo.slice(0, 20);
            this.setState({loaded:true, data: selectedData});
          }
        },
        (error) => {
          console.log(error);
          this.setState({loaded: true});
        })
    }
  }
  render() {
    if (this.state.gamePage) {
      if (this.state.selectedTeamStats.decision === 'win') {
        return (
          <div>
            <Title>Basketball Showdown</Title>
            <WinText>Congratulations! You Won</WinText>
            <IntroText>Final Score - You: {this.state.selectedTeamStats.teamStats.pts} {' ' + this.state.oppInfo.full_name + ': ' + this.state.selectedTeamStats.oppStats.pts}</IntroText>
            <ButtonHolder>
              <PlayButtons onClick={this.playAgainClick}>Play Again?!</PlayButtons>
            </ButtonHolder>
          </div>
        )
      } else {
        return (
          <div>
            <Title>Basketball Showdown</Title>
            <IntroText>Whoops! You Lost</IntroText>
            <IntroText>Final Score - You: {this.state.selectedTeamStats.teamStats.pts} {' ' + this.state.oppInfo.full_name + ': ' + this.state.selectedTeamStats.oppStats.pts}</IntroText>
            <ButtonHolder>
              <PlayButtons onClick={this.playAgainClick}>Play Again?!</PlayButtons>
            </ButtonHolder>
          </div>
        )
      }
    }
    if (this.state.pregameScenario) {
      console.log(this.state);
      return (
        <div>
          <Title>Basketball Showdown</Title>
          <IntroText>{this.state.pregameMessage}</IntroText>
          <ButtonHolder>
            <PlayButtons onClick={this.handleGameClick}>Play!</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.gamePreview) {
      if (!this.state.loadedOpp) {
        return (
        <div>
          <Title>Basketball Showdown</Title>
          <IntroText>Loading Your Opponent</IntroText>
        </div>
        )
      } else {
        return (
          <div>
            <Title>Basketball Showdown</Title>
            <div></div>
            <IntroText>Your Squad Will be Taking on the {' ' + this.state.oppInfo.full_name}</IntroText>
            <TeamRotationContainer>
              <div>
                {this.state.oppData.map((item, index) => <RosterText key={index}>{item[0][0].first_name + ' ' + item[0][0].last_name + ' ' + item[0][1].min + ' mins'}</RosterText>)}
              </div>
            </TeamRotationContainer>
            <ButtonHolder>
                <PlayButtons onClick={this.handlePregameClick}>Load Pregame Scenario</PlayButtons>
              </ButtonHolder>
          </div>
        )
      }
    }
    if (this.state.rosterView) {
      return (
        <div>
          <Title>Basketball Showdown</Title>
          <TeamRotationContainer>
          {this.state.rotation.map((item, index) =>
          <RosterText key={index}>{item[0][0].first_name + ' ' + item[0][0].last_name + ' ' + item[0][3].assignedMinutes + ' mins'}</RosterText>
          )}
          </TeamRotationContainer>
          <ButtonHolder>
            <PlayButtons onClick={this.handleRosterViewAdvanceClick}>Play a Game!</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.minutesAdj) {
      return (
        <div>
          <Title>Basketball Showdown</Title>
          <IntroText>Set Your Team's Minutes, Coach!</IntroText>
          <IntroText>{this.state.alottedMinutes} / 240</IntroText>
          <OuterCardViewContainer>
          <CardGridContainer>
            {this.state.selectedPlayerRecords.map((item, index) =>
            <div key={index}>
              <MinAdjCardView info={item}/>
              <input type="number" name="minutes" min="0" max="48" id={index} onChange={this.handleMinutesChange}></input>
            </div>)}
          </CardGridContainer>
          </OuterCardViewContainer>
          <ButtonHolder>
            <PlayButtons onClick={this.teamMinutesSelectedHandler}>Let's Play!</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.loaded) {
      return (
        <div>
          <Title>Basketball Showdown</Title>
          <IntroText>Select 12 Players!</IntroText>
          <IntroText>{this.state.selectedPlayerRecords.length} out of 12</IntroText>
          <OuterCardViewContainer>
          <CardGridContainer>{this.state.data.map((item, index) => <CardView onClick={this.cardClickHandler} key={index} info={item}/>)}</CardGridContainer>
          </OuterCardViewContainer>
          <ButtonHolder>
            <PlayButtons onClick={this.teamSelectedHandler}>Done?</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.selection) {
      return (
      <div>
        <Title>Basketball Showdown</Title>
        <IntroText>Loading Your Pack!</IntroText>
      </div>
      )
    }
  }
}

export default Main;