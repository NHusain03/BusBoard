import React, {Component, useEffect, useState} from "react";
import { ApiService } from "./ApiService";

export default function GetBusesTab() {

    const APIService = new ApiService();
    const [postcode, setPostcode] = useState("");
    const [buscode, setBuscode] = useState("");
    const [message, setMessage] = useState("");

    const GetBusFromCode = (buscode) => {
        APIService.GetBusFromCode(buscode).then((ArrivingBuses) => {
            alert(ArrivingBuses);
            setMessage(ArrivingBuses)
        })
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        GetBusFromCode(buscode);
    }

    let handleBuscodeChange = (event) => {
        setBuscode(event.target.value)
    }

    return (
        <div>
            <form>
                <label>Bus code:
                    <input type="text" value={buscode} onChange={(event) => handleBuscodeChange(event)} />
                </label>

                <input type="button" value="Search" onClick={() => handleSubmit()} />
            </form>
            {message}
        </div>
    )
}