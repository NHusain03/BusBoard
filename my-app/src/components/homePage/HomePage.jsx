import React, { Component } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";
import logo from './LondonBusLogo.png';

export class HomePage extends Component {
  render() {
    return (
        <HomeDiv>
          <HomeTitleContainer>
            <HomeTitleTag>Bus Board: </HomeTitleTag>
              <img src={logo} alt="Logo" width={90} align="right"/>
          </HomeTitleContainer>
        </HomeDiv>
    );
  }
}
