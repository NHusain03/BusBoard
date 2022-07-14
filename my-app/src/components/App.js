import React, {Component, useEffect, useState} from "react";
// import { Route } from "react-router";
import { Container } from "reactstrap";
import { HomePage } from "./homePage/HomePage";
import { ApiService } from "./ApiService";
import 'react-tabs/style/react-tabs.css';
import GetBusStopsFromPostcode from "./GetBusStopsFromPostcode";

export default function App() {
  const apiService = new ApiService()
  const [state, setState] = useState(BLANK_STATE);

  let healthCheck = () => {
    apiService.healthCheck().then((status) => {
      initialize(status);
    });
  };

  let initialize = (status) => {
    setState(status);
  };

  if (state === BLANK_STATE) {
    healthCheck()
  }

  return (

        <div>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                              rel="stylesheet"/>
                <title>Bus Board</title>
            </head>
          <Container>
                <body>
                  <HomePage/>
                      <GetBusStopsFromPostcode />

                </body>
          </Container>
        </div>

  );
}

const BLANK_STATE = {
  status: ""
};