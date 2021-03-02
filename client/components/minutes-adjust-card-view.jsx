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
      <PlayerName>{this.props.info.player.first_name + ' ' + this.props.info.player.last_name}</PlayerName>
      <Stats>{this.props.info.player.height_feet + '\'' + this.props.info.player.height_inches + '"' + ' ' + this.props.info.player.weight_pounds + ' lbs. ' + this.props.info.player.position}</Stats>
      <Stats>{this.props.info.team.full_name}</Stats>
      <Stats>{this.props.info.stats.min + 'mpg'}</Stats>
      <Stats>{(Math.round(this.props.info.stats.pts * 10) / 10) + 'pts'}</Stats>
      <Stats>{(Math.round(this.props.info.stats.reb * 10) / 10) + 'reb'}</Stats>
      <Stats>{(Math.round(this.props.info.stats.ast * 10) / 10) + 'ast'}</Stats>
      </Card>
    )
  }
}

export default MinAdjCardView;