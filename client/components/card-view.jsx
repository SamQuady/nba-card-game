import React from 'react';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>{this.props.info[0][0].first_name + ' ' + this.props.info[0][0].last_name}</div>
        <div>{this.props.info[0][0].height_feet + '\'' + this.props.info[0][0].height_inches + '"' + ' ' + this.props.info[0][0].weight_pounds + ' lbs. ' + this.props.info[0][0].position}</div>
        <div>{this.props.info[0][2].full_name}</div>
        <div>{this.props.info[0][1].min + 'mpg'}</div>
        <div>{(Math.round(this.props.info[0][1].pts * 10) / 10) + 'pts'}</div>
        <div>{(Math.round(this.props.info[0][1].reb * 10) / 10) + 'reb'}</div>
        <div>{(Math.round(this.props.info[0][1].ast * 10) / 10) + 'ast'}</div>
      </div>
    )
  }
}

export default CardView;

