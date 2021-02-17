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

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>Welcome to</div>
        <h1>Basketball Showdown!</h1>
        <div>
          <div>Get Started?</div>
          <ButtonHolder>
            <PlayButtons onClick={(event) => {this.props.onClick()}}>Play!</PlayButtons>
          </ButtonHolder>
        </div>
      </div>
    )
  }
}

export default Entry;