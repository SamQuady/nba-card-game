import React from 'react';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Basketball Showdown</h2>
        <div>
          <div>Have you every stared at a set of basketball cards and wished that you could turn them into a real team?</div>
          <div>Well, now you can</div>
          <div>With Basketball Showdown, you can get a pack of cards, assemble them into a team, and then see how they stack up against an entire league of other teams!</div>
          <div>Are you ready to get started?</div>
          <button onClick={(event) => {this.props.onClick()}}>Deal Me a Pack!</button>
        </div>
      </div>
    )
  }
}

export default Intro;