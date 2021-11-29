import React, { useState } from "react";
import { Button } from "@mui/material";

import ChooseGenre from "./ChooseGenre";
import ChoosePositivity from "./ChoosePositivity";

import "./styles.css";

const Preferences = () => {
    const [poslevel, setPoslevel] = useState(50);
    const [genres, setGenres] = useState([]);

    const showGenre = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.getElementById(`Preferences__positivity-active`).id =
            "Preferences__positivity-disable";
        document.getElementById(`Preferences__genre-disable`).id =
            "Preferences__genre-active";
    };

    return (
        <div>
            <div id="Preferences__genre-active">
                <ChooseGenre
                    poslevel={poslevel}
                    setPoslevel={setPoslevel}
                    genres={genres}
                    setGenres={setGenres}
                />
            </div>
            <div id="Preferences__positivity-disable">
                <ChoosePositivity
                    poslevel={poslevel}
                    setPoslevel={setPoslevel}
                    genres={genres}
                    setGenres={setGenres}
                />
                <div className="Preferences__show">
                    <Button
                        onClick={showGenre}
                        className="Preferences__show-button"
                        variant="outlined"
                    >
                        Set Genres
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
