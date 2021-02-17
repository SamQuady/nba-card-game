import React from 'react';
import CardView from './card-view.jsx';
import styled from 'styled-components';

const CardGridContainer = styled.div`
display: grid;
grid-template-columns: 18% 18% 18% 18% 18%;
grid-column-gap: 1%;
grid-row-gap: 2%;
`;

const PlayButtons = styled.button`
line-height: 30px;
margin-left: 0.75em;
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
      pregameEvent: false,
      gamePage: false,
      data: [],
      teamIndexes: [],
      selectedPlayerRecords: [],
      rotation: [],
      selectedTeamStats: {},
      alottedMinutes: 0,
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
    console.log(records);
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
  }

  componentDidMount() {
    //add more robust null elimination, more robust prevention of additional entries upon first selection click
    let ids = this.packIdSelection();
    let colatedInfo = [];
    let selectedIds = [];
    for (let index = 0; index < ids.length; index ++) {
      fetch('http://localhost:8080/api/players/' + ids[index])
        .then(result => result.json())
        .then((result) => {
          let playerId = result[0].id;
          if (selectedIds.indexOf(playerId) < 0) {
            selectedIds.push(playerId);
            if (result[1] !== null) {
              result.push({assignedMinutes: 0});
              let categories = Object.keys(result[1]);
              let perMin = {};
              let minutes = result[1].min;
              let minutesSplit = minutes.split(':');
              let fractionMinutes = Number(minutesSplit[0]) + (Number(minutesSplit[1]) / 60);
              for (let i = 0; i < categories.length; i++) {
                if (categories[i] === 'min') {
                  perMin.min = 1;
                } else {
                  perMin.[categories[i]] = (result[1][categories[i]] / fractionMinutes);
                }
              }
              result.push(perMin);
              colatedInfo.push([result]);
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
    if (this.state.gamePreview) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          <div>Your Squad Will Be Taking on the </div>
        </div>
      )
    }
    if (this.state.rosterView) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          {this.state.rotation.map((item, index) =>
          <div key={index}>{item[0][0].first_name + ' ' + item[0][0].last_name + ' ' + item[0][3].assignedMinutes + ' mins'}</div>
          )}
          <ButtonHolder>
            <PlayButtons onClick={this.handleRosterViewAdvanceClick}>Play a Game!</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.minutesAdj) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          <div>Set Your Team's Minutes, Coach!</div>
          <div>{this.state.alottedMinutes} / 240</div>
          <CardGridContainer>
            {this.state.selectedPlayerRecords.map((item, index) =>
            <div key={index}>
              <CardView info={item}/>
              <input type="number" name="minutes" min="0" max="48" id={index} onChange={this.handleMinutesChange}></input>
            </div>)}
          </CardGridContainer>
          <ButtonHolder>
            <PlayButtons onClick={this.teamMinutesSelectedHandler}>Let's Play!</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.loaded) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          <div>Select 12 Players!</div>
          <div>{this.state.selectedPlayerRecords.length} out of 12</div>
          <CardGridContainer>{this.state.data.map((item, index) => <CardView onClick={this.cardClickHandler} key={index} info={item}/>)}</CardGridContainer>
          <ButtonHolder>
            <PlayButtons onClick={this.teamSelectedHandler}>Done?</PlayButtons>
          </ButtonHolder>
        </div>
      )
    }
    if (this.state.selection) {
      return (
      <div>
        <h2>Basketball Showdown</h2>
        <div>Loading Your Pack!</div>
      </div>
      )
    }
  }
}

export default Main;