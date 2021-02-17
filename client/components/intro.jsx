import React from 'react';
import styled from 'styled-components';

const PlayButtons = styled.button`
line-height: 30px;
margin-left: 0.75em;
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
`;

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Basketball Showdown</h2>
        <div>
          <div>Have you every stared at a set of basketball cards and wished that you could turn them into a real team?</div>
          <div>Well, now you can</div>
          <div>With Basketball Showdown, you can get a pack of cards, assemble them into a team, and then see how they stack up against an entire league of other teams!</div>
          <div>Are you ready to get started?</div>
          <ButtonHolder>
            <PlayButtons onClick={(event) => {this.props.onClick()}}>Deal Me a Pack!</PlayButtons>
          </ButtonHolder>
        </div>
      </div>
    )
  }
}

export default Intro;