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
          this.setState({clicked: [!this.state.clicked]})
          this.props.onClick(this.props.info);
        }}>
          <div>{this.props.info[0][0].first_name + ' ' + this.props.info[0][0].last_name}</div>
          <div>{this.props.info[0][0].height_feet + '\'' + this.props.info[0][0].height_inches + '"' + ' ' + this.props.info[0][0].weight_pounds + ' lbs. ' + this.props.info[0][0].position}</div>
          <div>{this.props.info[0][2].full_name}</div>
          <div>{this.props.info[0][1].min + 'mpg'}</div>
          <div>{(Math.round(this.props.info[0][1].pts * 10) / 10) + 'pts'}</div>
          <div>{(Math.round(this.props.info[0][1].reb * 10) / 10) + 'reb'}</div>
          <div>{(Math.round(this.props.info[0][1].ast * 10) / 10) + 'ast'}</div>
        </ClickedCard>
      )
    } else {
      return (
        <Card onClick={(event) => {
          this.setState({clicked: [!this.state.clicked]})
          this.props.onClick(this.props.info);
        }}>
        <div>{this.props.info[0][0].first_name + ' ' + this.props.info[0][0].last_name}</div>
        <div>{this.props.info[0][0].height_feet + '\'' + this.props.info[0][0].height_inches + '"' + ' ' + this.props.info[0][0].weight_pounds + ' lbs. ' + this.props.info[0][0].position}</div>
        <div>{this.props.info[0][2].full_name}</div>
        <div>{this.props.info[0][1].min + 'mpg'}</div>
        <div>{(Math.round(this.props.info[0][1].pts * 10) / 10) + 'pts'}</div>
        <div>{(Math.round(this.props.info[0][1].reb * 10) / 10) + 'reb'}</div>
        <div>{(Math.round(this.props.info[0][1].ast * 10) / 10) + 'ast'}</div>
        </Card>
      )
    }
  }
}

export default CardView;

