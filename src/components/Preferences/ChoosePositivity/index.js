import React, { useState } from "react";
import { Slider, Button } from "@mui/material";
import "./styles.css";

import PositivityImages from "../../../assets/images/PositivityRange";

const ChoosePositivity = () => {
    const [poslevel, setPoslevel] = useState(50);
    const { pos_25, pos_50, pos_75, pos_100 } = PositivityImages
    const marks = [
        {
          value: 20,
        },
        {
          value: 50,
        },
        {
          value: 75,
        },
        {
          value: 100,
        },
      ];

    const handleChange = (e) => {
        [25, 50, 75, 100].forEach((val) => document.getElementById(`pos_${val}`).style = "display: none;");
        document.getElementById(`pos_${e.target.value}`).style = "display: block;";

        setPoslevel(e.target.value);
    }

    const handleSave = () => {
        console.log(poslevel);
    }

    return (
        <div className = "ChoosePositivity">
            <h1>Set a positivity level for your news feed.</h1>
            <p>This will help us curate a more personalized news feed, with a minimum positivity score set by you.</p>
            <div className = "ChoosePositivity__emojis">
                <ul>
                    <li>
                        <img id = "pos_25" className = "ChoosePositivity__emoji-img" src = {pos_25} />
                    </li>
                    <li>
                        <img id = "pos_50" className = "ChoosePositivity__emoji-img" src = {pos_50} />
                    </li>
                    <li>
                        <img id = "pos_75" className = "ChoosePositivity__emoji-img" src = {pos_75} />
                    </li>
                    <li>
                        <img id = "pos_100" className = "ChoosePositivity__emoji-img" src = {pos_100} />
                    </li>
                </ul>
            </div>
            <Slider
                className = "ChoosePositivity__slider"
                aria-label="positivity"
                defaultValue={100}
                marks = {marks}
                step={null}
                min={25}
                max={100}
                onChange = {(e) => handleChange(e)}
            />  
            <div className = "ChoosePositivity__save">
                <Button onClick = {handleSave} className = "ChoosePositivity__save-button">
                    Save
                </Button>
            </div>
        </div>
    );
}

export default ChoosePositivity;