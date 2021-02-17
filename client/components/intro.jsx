import React from 'react';
import styled from 'styled-components';

const PlayButtons = styled.button`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(184, 184, 184);
border-width: 1px;
color: rgb(41, 41, 41);
cursor: pointer;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 14px;
font-weight: 400;
height: 34px;
width: auto;
&:hover {box-shadow: inset 0 0 3px #000000;}
`;

const ButtonHolder = styled.div`
margin-top: 30px;
padding-top: 30px;
text-align: center;
`;

const Title = styled.h2`
font-family: Copperplate, fantasy;
font-size: 30px;
text-align: center;
`;

const IntroText = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 20px;
text-align: center;
`;

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Title>Basketball Showdown</Title>
        <div>
          <IntroText>Have you every stared at a set of basketball cards and wished that you could turn them into a real team?</IntroText>
          <IntroText>Well, now you can</IntroText>
          <IntroText>With Basketball Showdown, you can get a pack of cards, assemble them into a team, and then see how they stack up against an entire league of other teams!</IntroText>
          <IntroText>Are you ready to get started?</IntroText>
          <ButtonHolder>
            <PlayButtons onClick={(event) => {this.props.onClick()}}>Deal Me a Pack!</PlayButtons>
          </ButtonHolder>
        </div>
      </div>
    )
  }
}

export default Intro;