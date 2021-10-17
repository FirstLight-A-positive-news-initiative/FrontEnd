import React from "react";
import { Button } from "@mui/material";

import ChooseGenre from "./ChooseGenre";
import ChoosePositivity from "./ChoosePositivity";

import "./styles.css";

const Preferences = () => {

    const showPositivity = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.getElementById(`Preferences__genre-active`).id = "Preferences__genre-disable";
        document.getElementById(`Preferences__positivity-disable`).id = "Preferences__positivity-active";
    }

    const showGenre = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.getElementById(`Preferences__positivity-active`).id = "Preferences__positivity-disable";
        document.getElementById(`Preferences__genre-disable`).id = "Preferences__genre-active";
    }

    return (
        <div>
            <div id = "Preferences__genre-active">
                <ChooseGenre />
                <div className = "Preferences__show">
                    <Button onClick = {showPositivity} className = "Preferences__show-button" variant = "outlined">Set Positivity</Button>
                </div>
            </div>
            <div id = "Preferences__positivity-disable">
                <ChoosePositivity />
                <div className = "Preferences__show">
                    <Button onClick = {showGenre} className = "Preferences__show-button" variant = "outlined">Set Genres</Button>
                </div>
            </div>
        </div>
    )
}

export default Preferences