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

  const APIService = new ApiService()
  const [state, setState] = useState(BLANK_STATE);

  const initialize = (status) => {
    setState(status);
  };

  let healthCheck = () => {
    APIService.healthCheck().then((outputStatus) => {
      initialize(outputStatus);
      })
    };

  if (state === BLANK_STATE) {
    healthCheck()
  }

  return (
    <div>
      <Container>
          <HomePage />
          {state}
          <Tabs>
            <TabList>
              <Tab>Get Buses</Tab>
            </TabList>

            <TabPanel>
              <GetBusesTab />
            </TabPanel>
          </Tabs>

      </Container>
    </div>
    );

}

// class Clock extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {time: new Date()};
//   }
//
//   componentDidMount() {
//     this.ticker = setInterval(() => this.tick(), 1000)
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.ticker)
//   }
//
//   tick() {
//     this.setState({time: new Date()});
//   };
//
//   render(){
//     return (
//             <div>
//               It is {new Date().toLocaleTimeString()}.
//             </div>
//         )
//   }
// }

// function Clock(){
//   const [time, setTime] = useState(new Date())
//   const [tickerIsOn, setTickerIsOn] = useState(false)
//   const [ticker, setTicker] = useState(0)
//
//   function tick(){
//     setTime(new Date())
//   }
//
//   useEffect(() =>{
//     if(!tickerIsOn){
//       setTicker(setInterval(tick,100))
//       setTickerIsOn(true)
//     }
//     return () => {
//       if(tickerIsOn){
//         clearInterval(ticker)
//         setTickerIsOn(false)
//       }
//     }
//
//   })
//
//   return (
//           <div>
//             It is {new Date().toLocaleTimeString()}.
//           </div>
//       )
// }
//


const BLANK_STATE = {
  example: {
    id: null,
    data1: null,
    data2: null
  },
  status: "",
};