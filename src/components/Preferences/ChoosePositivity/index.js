import React, { useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import userContext from "../../../context/userContext";
import { Slider, Button } from "@mui/material";
import "./styles.css";

import PositivityImages from "../../../assets/images/PositivityRange";

const ChoosePositivity = ({ history, poslevel, setPoslevel, genres }) => {
    const { pos_0, pos_33, pos_66, pos_90 } = PositivityImages;
    const [user, setUser] = useContext(userContext);
    const marks = [
        {
            value: 0,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 75,
        },
    ];

    const handleChange = (e) => {
        [0, 25, 50, 75].forEach(
            (val) =>
                (document.getElementById(`pos_${val}`).style = "display: none;")
        );
        document.getElementById(`pos_${e.target.value}`).style =
            "display: block;";

        setPoslevel(e.target.value);
    };

    const handleSave = () => {
        if (JSON.parse(localStorage.getItem("firstlightUser")).genre && JSON.parse(localStorage.getItem("firstlightUser")).positivity >= 0) {
            let id = null;
            if (JSON.parse(localStorage.getItem("firstlightUser"))[0]) {
                id = JSON.parse(localStorage.getItem("firstlightUser"))[0]["_id"];
            } else if (JSON.parse(localStorage.getItem("firstlightUser"))["_id"]) {
                id = JSON.parse(localStorage.getItem("firstlightUser"))["_id"];
            }
            if (id) {
                axios
                    .post(`${process.env.REACT_APP_API}/users/preferences/`, {
                        id,
                        genre: genres,
                        positivity: poslevel,
                    })
                    .then((res) => {
                        setUser((prevUser) => {
                            return { ...prevUser, genre: genres, poslevel };
                        });
                        localStorage.setItem(
                            "firstlightUser",
                            JSON.stringify({ ...res.data, "genre": genres, "positivity": poslevel })
                        );
                    })
                    .then(() => {
                        history.push("/featured");
                    });
            }
        } else {
            axios
                .post(`${process.env.REACT_APP_API}/users/`, {
                    ...user,
                    genre: genres,
                    positivity: poslevel,
                })
                .then((res) => {
                    setUser((prevUser) => {
                        return { ...prevUser, genre: genres, poslevel };
                    });
                    localStorage.setItem(
                        "firstlightUser",
                        JSON.stringify({ ...res.data, "genre": genres, "positivity": poslevel })
                    );
                })
                .then(() => {
                    history.push("/featured");
                });
        }
    };

    return (
        <div className="ChoosePositivity">
            <h1>Set a positivity level for your news feed.</h1>
            <p>
                This will help us curate a more personalized news feed, with a
                minimum positivity score set by you.
            </p>
            <div className="ChoosePositivity__emojis">
                <ul>
                    <li>
                        <img
                            id="pos_0"
                            className="ChoosePositivity__emoji-img"
                            src={pos_0}
                            alt="pos_range"
                            style={{ display: 'none' }}
                        />
                    </li>
                    <li>
                        <img
                            id="pos_25"
                            className="ChoosePositivity__emoji-img"
                            src={pos_33}
                            alt="pos_range"
                            style={{ display: 'none' }}
                        />
                    </li>
                    <li>
                        <img
                            id="pos_50"
                            className="ChoosePositivity__emoji-img"
                            src={pos_66}
                            alt="pos_range"
                            style={{ display: 'none' }}
                        />
                    </li>
                    <li>
                        <img
                            id="pos_75"
                            className="ChoosePositivity__emoji-img"
                            src={pos_90}
                            alt="pos_range"
                        />
                    </li>
                </ul>
            </div>
            <Slider
                className="ChoosePositivity__slider"
                aria-label="positivity"
                defaultValue={75}
                marks={marks}
                step={null}
                min={0}
                max={75}
                onChange={(e) => handleChange(e)}
            />
            <div className="ChoosePositivity__save">
                <Button
                    onClick={handleSave}
                    className="ChoosePositivity__save-button"
                >
                    Save Positivity and Exit
                </Button>
            </div>
        </div>
    );
};

export default withRouter(ChoosePositivity);
