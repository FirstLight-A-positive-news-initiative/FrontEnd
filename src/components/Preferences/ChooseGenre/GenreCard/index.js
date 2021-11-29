import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, CardActions, Button, CardMedia } from "@mui/material";

import "./styles.css";

const GenreCard = ({ genre, image, selected_genres, set_genres }) => {

    const handleGenre = () => {
        var curr_button = document.getElementById(`GenreCard__genre-button-${genre}`).classList;
        var s = false;
        for(var i = 0; i < curr_button.length; i++) {
            if(curr_button[i] === `GenreCard__choice-button-selected`) {
                s = true;
            }
        }
        if(s) {
            curr_button.remove(`GenreCard__choice-button-selected`);
        } else {
            curr_button.add(`GenreCard__choice-button-selected`);
        }

        var idx = selected_genres.indexOf(genre);
        if(idx !== -1) {
            selected_genres.splice(idx, 1);
            set_genres([...selected_genres]);
        } else {
            set_genres([...selected_genres, genre]);
        }
    }

    return (
        <Box className = "GenreCard__box">
            <Card variant = "outlined" className = "GenreCard__card" onClick = {()=>handleGenre()}>
                <CardContent>
                    <CardMedia
                        component = "img"
                        image = {image}
                        alt = {genre}
                        className = "GenreCard__genre-image"
                    />
                </CardContent>
                <CardActions>
                    <Button id = {`GenreCard__genre-button-${genre}`} value = {genre} className = "GenreCard__choice-button">{genre}</Button>
                </CardActions>
            </Card>
        </Box>
    )
} 

export default GenreCard;