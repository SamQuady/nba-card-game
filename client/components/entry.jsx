import React from 'react';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>Welcome to</div>
        <h1>Basketball Showdown!</h1>
        <div>
          <div>Get Started?</div>
          <button onClick={(event) => {this.props.onClick()}}>Play!</button>
        </div>
      </div>
    )
  }
}

export default Entry;