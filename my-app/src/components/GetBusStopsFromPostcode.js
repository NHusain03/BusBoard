import React, {Component, useEffect, useState} from "react";
import { ApiService } from "./ApiService";

export default function GetBusStopsFromPostcode() {

    const APIService = new ApiService();
    const [postcode, setPostcode] = useState("");
    const [radius, setRadius] = useState("");
    const [stops, setStops] = useState("");

    const GetBusStopsFromPostcode = (postcode, radius) => {
        APIService.GetBusStopsFromPostcode(postcode, radius).then((NearestStops) => {
            const formattedStops = formatStops(NearestStops);
            setStops(formattedStops)
        })
    }

    let handleSubmit = (event) => {
        GetBusStopsFromPostcode(postcode, radius);
    }

    let handlePostcodeChange = (event) => {
        setPostcode(event.target.value)
    }

    let handleRadiusChange = (event) => {
        setRadius(event.target.value)
    }


    let formatStops = (NearestStops) => {
        return NearestStops['Stops'].map(stop => <h3 id="stops">Stop {stop['NaptanID']} called {stop['CommonName']} is {Math.round(stop['Distance'])} metres away{formatArrival(stop)}</h3>);
    }

    let ConvertSecondsToMins = (secs) => {
        const minutes = String(Math.floor(secs / 60))
        let leftoverSeconds = secs % 60;
        leftoverSeconds = (leftoverSeconds < 10) ? "0"+String(leftoverSeconds) : String(leftoverSeconds)
        return String(minutes) + ":" + leftoverSeconds
    }

    let formatArrival = (ArrivingBuses) => {
        return ArrivingBuses['Buses'].map(bus => <li id="buses">Bus {bus['LineID']} heading to {bus['Destination']} will arrive
            in {ConvertSecondsToMins(bus['TimeToStation'])} minutes</li>);
    }

    return (
        <div id="box1">
            <div>
                <form id="formtext">
                    <label>Postcode:{"   "}
                        <input type="text" id="inputtext" value={postcode} onChange={(event) => handlePostcodeChange(event)} />
                    </label>
                    <label>   Radius:{"   "}
                        <input type="text" id="inputtext" value={radius} onChange={(event) => handleRadiusChange(event)} />
                    </label>

                    <input id="searchButton" type="button" value="Search" onClick={() => handleSubmit()} />
                </form>
            </div>
            <div id="messageText">
                {stops}
            </div>
        </div>
    )
}