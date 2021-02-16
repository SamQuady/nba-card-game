import React from 'react';
import CardView from './card-view.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      selection: true,
      minutesAdj: false,
      data: []
    };
    this.packIdSelection = this.packIdSelection.bind(this);
  }

  packIdSelection() {
    let results = [];
    for (let index = 0; index < 40; index ++) {
      let id = Math.floor(Math.random() * (494 - 1) + 1);
      results.push(id);
    }
    return results;
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
    if (this.state.loaded === true) {
      return (
        <div>
          <h2>Basketball Showdown</h2>
          <div>{this.state.data.map((item, index) => <CardView key={index} info={item}/>)}</div>
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