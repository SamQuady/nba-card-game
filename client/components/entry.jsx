import React from 'react';
import styled from 'styled-components';

const PlayButtons = styled.button`
line-height: 30px;
background-color: white;
border-radius: 2px;
border-style: solid;
border-color: rgb(104, 104, 104);
border-width: 1px;
color: rgb(41, 41, 41);
cursor: pointer;
font-family: "Roboto","Helvetica Neue","Helvetica","Arial",sans-serif;
font-size: 20x;
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

const Title = styled.h1`
font-family: Copperplate, fantasy;
font-size: 40px;
text-align: center;
`;

const IntroText = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 20px;
text-align: center;
`;

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <IntroText>Welcome to</IntroText>
        <Title>Basketball Showdown!</Title>
        <div>
          <IntroText>Get Started?</IntroText>
          <ButtonHolder>
            <PlayButtons onClick={(event) => {this.props.onClick()}}>Play!</PlayButtons>
          </ButtonHolder>
        </div>
      </div>
    )
  }
}

export default Entry;