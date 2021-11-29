import React from "react";
import { withRouter } from "react-router-dom";
import GenreCard from "./GenreCard/index";
import { Grid, Button, Alert } from "@mui/material";
import GenreCardImages from "../../../assets/images/GenreCard";
import "./styles.css";

const ChooseGenre = ({ genres, setGenres}) => {

    const genre_list = [
        {
            genre: "World",
            image: GenreCardImages.World,
        },
        {
            genre: "India",
            image: GenreCardImages.India,
        },
        {
            genre: "Entertainment",
            image: GenreCardImages.Entertainment,
        },
        {
            genre: "Politics",
            image: GenreCardImages.Politics,
        },
        {
            genre: "Science",
            image: GenreCardImages.Science,
        },
        {
            genre: "Technology",
            image: GenreCardImages.Technology,
        },
        {
            genre: "Offbeat",
            image: GenreCardImages.Offbeat,
        },
        {
            genre: "Sports",
            image: GenreCardImages.Sports,
        },
    ];

    const handleClick = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        if (genres.length < 3) {
            document.getElementById(
                `ChooseGenre__alert-box`
            ).className = `ChooseGenre__alert`;
        } else {
            document.getElementById(
                `ChooseGenre__alert-box`
            ).className = `ChooseGenre__alert-disable`;
        }
    };

    return (
        <div className="ChooseGenre">
            <h2 className="ChooseGenre__heading">
                Please select your favorite genres
            </h2>
            <Alert
                id="ChooseGenre__alert-box"
                severity="warning"
                className="ChooseGenre__alert-disable"
            >
                Please select atleast 3 genres.
            </Alert>
            <Grid className="ChooseGenre__genre-grid" container spacing={2}>
                {genre_list.map((g) => (
                    <Grid
                        key={g.genre}
                        item
                        className="ChooseGenre__genre-grid-item"
                    >
                        <GenreCard
                            genre={g.genre}
                            image={g.image}
                            selected_genres={genres}
                            set_genres={setGenres}
                            key={g.genre}
                        />
                    </Grid>
                ))}
            </Grid>
            <div id="ChooseGenre__submit-button-div">
                <Button
                    onClick={handleClick}
                    id="ChooseGenre__submit-button"
                    variant="outlined"
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default withRouter(ChooseGenre);
