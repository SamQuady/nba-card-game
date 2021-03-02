import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
background-color: white;
length: 100px;
border-radius: 4px;
border-style: solid;
border-color: rgb(184, 184, 184);
border-width: 4px;
color: rgb(41, 41, 41);
cursor: pointer;
font-size: 20px;
&:hover {box-shadow: inset 0 0 10px #000000;}
`;

const ClickedCard = styled.div`
background-color: rgb(230, 230, 230);
length: 100px;
border-radius: 4px;
border-style: solid;
border-color: rgb(104, 104, 104);
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

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  render() {
    if (this.state.clicked) {
      return (
        <ClickedCard onClick={(event) => {
          this.setState({clicked: false})
          this.props.onClick(this.props.info);
        }}>
          <PlayerName>{this.props.info[0][0].first_name + ' ' + this.props.info[0][0].last_name}</PlayerName>
          <Stats>{this.props.info[0][0].height_feet + '\'' + this.props.info[0][0].height_inches + '"' + ' ' + this.props.info[0][0].weight_pounds + ' lbs. ' + this.props.info[0][0].position}</Stats>
          <Stats>{this.props.info[0][2].full_name}</Stats>
          <Stats>{this.props.info[0][1].min + 'mpg'}</Stats>
          <Stats>{(Math.round(this.props.info[0][1].pts * 10) / 10) + 'pts'}</Stats>
          <Stats>{(Math.round(this.props.info[0][1].reb * 10) / 10) + 'reb'}</Stats>
          <Stats>{(Math.round(this.props.info[0][1].ast * 10) / 10) + 'ast'}</Stats>
        </ClickedCard>
      )
    } else {
      return (
        <Card onClick={(event) => {
          this.setState({clicked: true});
          this.props.onClick(this.props.info);
        }}>
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
}

export default CardView;

