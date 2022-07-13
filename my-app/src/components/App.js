import React, {Component, useEffect, useState} from "react";
// import { Route } from "react-router";
import { Container } from "reactstrap";
import { HomePage } from "./homePage/HomePage";
import { ApiService } from "./ApiService";
import {clear} from "@testing-library/user-event/dist/clear";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GetBusesTab from "./GetBuses";

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
      <Container>
          <HomePage/>
          <Tabs>
            <TabList>
              <Tab>Bus Schedule by Stop Code</Tab>
            </TabList>

            <TabPanel>
              <GetBusesTab />
            </TabPanel>
          </Tabs>

      </Container>
    </div>
  );
}

const BLANK_STATE = {
  status: ""
};