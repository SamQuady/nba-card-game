import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entryPage: true,
      introPage: false,
      gamePage: false
    };
  }
  render() {
    return (
      <div>
        <div>Welcome to</div>
        <h1>Basketball Showdown!</h1>
      </div>
    )
  }
}

export default App;