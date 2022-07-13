import React, {Component, useEffect, useState} from "react";
import { ApiService } from "./ApiService";

export default function GetBusesTab() {

    const APIService = new ApiService();
    const [postcode, setPostcode] = useState("");
    const [buscode, setBuscode] = useState("");
    const [message, setMessage] = useState("");

    const GetBusFromCode = (buscode) => {
        APIService.GetBusFromCode(buscode).then((ArrivingBuses) => {
            // alert(ArrivingBuses);
            const formattedBuses = formatArrival(ArrivingBuses);
            setMessage(formattedBuses)
        })
    }

    let handleSubmit = (event) => {
        // event.preventDefault();
        GetBusFromCode(buscode);
    }

    let handleBuscodeChange = (event) => {
        setBuscode(event.target.value)
    }

    let formatArrival = (ArrivingBuses) => {
        const splitBuses = ArrivingBuses['results'].split('\n');
        splitBuses.pop();
        return splitBuses.map(bus => <li>{bus}</li>);

    }

    return (
        <div>
            <form>
                <label>Bus Stop Code:
                    <input type="text" value={buscode} onChange={(event) => handleBuscodeChange(event)} />
                </label>

                <input type="button" value="Search" onClick={() => handleSubmit()} />
            </form>
            {message}
        </div>
    )
}