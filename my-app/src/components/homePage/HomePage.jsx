import React, { Component } from "react";
import {
  HomeDiv,
  HomeTitleTag,
  HomeTitleContainer,
} from "./HomeComponents";

export class HomePage extends Component {
  render() {
    return (
        <HomeDiv>
          <HomeTitleContainer>
            <HomeTitleTag>Bus Board</HomeTitleTag>
              <a href="https://tfl.gov.uk/"><img src={"https://webstockreview.net/images/london-clipart-double-decker-bus-19.png"} alt="Logo" width={100} align="right" /></a>
          </HomeTitleContainer>
        </HomeDiv>
    );
  }
}
