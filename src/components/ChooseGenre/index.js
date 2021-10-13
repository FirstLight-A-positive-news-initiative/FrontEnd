import React, { useState } from "react";
import GenreCard from "./GenreCard/index";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import GenreCardImages from "../../assets/images/GenreCard";
import "./styles.css";

const ChooseGenre = () => {

    const [genres, setGenres] = useState([]);
    
    const genre_list = [
        {
            genre: "Entertainment",
            image: GenreCardImages.Entertainment
        },
        {
            genre: "Politics",
            image: GenreCardImages.Politics
        },
        {
            genre: "Science",
            image: GenreCardImages.Science
        },
        {
            genre: "Technology",
            image: GenreCardImages.Technology
        },
        {
            genre: "Sports",
            image: GenreCardImages.Sports
        },
    ]

    const handleClick = () => {
        console.log("Selected Genres --> " + genres);
    }

    return (
        <div>
            <h2 className = "ChooseGenre__heading">Please select your favorite genres!</h2>
            <Grid className = "ChooseGenre__genre-grid" container spacing = {2}>
                {
                    genre_list.map((g) => (
                        <Grid item>
                            <GenreCard 
                                genre = {g.genre}
                                image = {g.image}
                                selected_genres = {genres}
                                set_genres = {setGenres}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <div id = "ChooseGenre__submit-button-div">
                <Button onClick = {handleClick} id = "ChooseGenre__submit-button" variant = "outlined">Save</Button>
            </div>
        </div>
    )
}

export default ChooseGenre;