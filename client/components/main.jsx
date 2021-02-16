import React from 'react';

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
    for (let index = 0; index < 20; index ++) {
      let id = Math.floor(Math.random() * (494 - 1) + 1);
      if (results.indexOf(id) >= 0) {
        index = index -1;
      }
      results.push(id);
    }
    return results;
  }
  componentDidMount() {
    let ids = this.packIdSelection();
    let colatedInfo = [];
    for (let index = 0; index < ids.length; index ++) {
      fetch('http://localhost:8080/api/' + ids[index])
        .then(result => result.json())
        .then((result) => {
          colatedInfo.push([result]);
          if (colatedInfo.length === ids.length) {
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
    if (this.state.selection) {
      return (
      <div>
        <h2>Basketball Showdown</h2>
      </div>
      )
    }
  }
}

export default Main;