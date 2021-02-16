import React from 'react';
import Entry from './entry.jsx';
import Intro from './intro.jsx';
import Main from './main.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      navList: {page: 'entryPage', next: {page: 'introPage', next: {page: 'gamePage', next: null}}},
      entryPage: true,
      introPage: false,
      gamePage: false
    };
    this.pageAdvanceClick = this.pageAdvanceClick.bind(this);
  }

  pageAdvanceClick() {
    let displayed = this.state.navList.page;
    let next = this.state.navList.next;
    this.setState({navList: next, [displayed]: false, [next.page]: true});
  }

  render() {
    if (this.state.entryPage) {
      return (
        <div>
          <Entry onClick={this.pageAdvanceClick}/>
        </div>
      )
    }
    if (this.state.introPage) {
      return (
        <div>
          <Intro onClick={this.pageAdvanceClick}/>
        </div>
      )
    }
    if (this.state.gamePage) {
      return (
        <div>
          <Main />
        </div>
      )
    }
  }
}

export default App;