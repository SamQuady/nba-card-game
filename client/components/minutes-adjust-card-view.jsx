import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
height: 170px;
background-color: white;
border-radius: 4px;
border-style: solid;
border-color: rgb(184, 184, 184);
border-width: 4px;
color: rgb(41, 41, 41);
cursor: pointer;
font-size: 20px;
&:hover {box-shadow: inset 0 0 10px #000000;}
`;

const PlayerName = styled.div`
font-family: Copperplate, fantasy;
font-size: 20px;
text-align: center;
`;

const Stats = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 16px;
text-align: center;
`;

class MinAdjCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Card >
      <PlayerName>{this.props.info[0][0].first_name + ' ' + this.props.info[0][0].last_name}</PlayerName>
      <Stats>{this.props.info[0][0].height_feet + '\'' + this.props.info[0][0].height_inches + '"' + ' ' + this.props.info[0][0].weight_pounds + ' lbs. ' + this.props.info[0][0].position}</Stats>
      <Stats>{this.props.info[0][2].full_name}</Stats>
      <Stats>{this.props.info[0][1].min + 'mpg'}</Stats>
      <Stats>{(Math.round(this.props.info[0][1].pts * 10) / 10) + 'pts'}</Stats>
      <Stats>{(Math.round(this.props.info[0][1].reb * 10) / 10) + 'reb'}</Stats>
      <Stats>{(Math.round(this.props.info[0][1].ast * 10) / 10) + 'ast'}</Stats>
      </Card>
    )
  }
}

export default MinAdjCardView;