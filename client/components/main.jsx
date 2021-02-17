import React from 'react';
import CardView from './card-view.jsx';
import styled from 'styled-components';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selection: true,
      minutesAdj: false,
      data: [],
      teamIndexes: [],
      selectedPlayerRecords: []
    };
    this.packIdSelection = this.packIdSelection.bind(this);
    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.teamSelectedHandler = this.teamSelectedHandler.bind(this);
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

  componentDidMount() {
    let ids = this.packIdSelection();
    let colatedInfo = [];
    let selectedIds = [];
    for (let index = 0; index < ids.length; index ++) {
      fetch('http://localhost:8080/api/' + ids[index])
        .then(result => result.json())
        .then((result) => {
          let playerId = result[0].id;
          if (selectedIds.indexOf(playerId) < 0) {
            selectedIds.push(playerId);
            if (result[1] !== null) {
              colatedInfo.push([result]);
            }
          }
          if (colatedInfo.length === 20) {
            this.setState({loaded:true, data: colatedInfo});
          }
        },
        (error) => {
          console.log(error);
          this.setState({loaded: true});
        })
    }
  }
  render() {
    if (this.state.minutesAdj) {
      return (
        <div>{this.state.selectedPlayerRecords.map((item, index) => <CardView key={index} info={item}/>)}</div>
      )
    }
    if (this.state.loaded) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          <div>Select 12 Players!</div>
          <div>{this.state.selectedPlayerRecords.length} out of 12</div>
          <div>{this.state.data.map((item, index) => <CardView onClick={this.cardClickHandler} key={index} info={item}/>)}</div>
          <button onClick={this.teamSelectedHandler}>Done?</button>
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