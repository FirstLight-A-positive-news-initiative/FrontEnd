import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import "./styles.css";

const GenreCard = ({ genre, image, selected_genres, set_genres }) => {

    const handleGenre = (e) => {
        var curr_button = document.getElementById(e.target.id).classList;
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

        var idx = selected_genres.indexOf(e.target.value);
        if(idx !== -1) {
            selected_genres.splice(idx, 1);
            set_genres([...selected_genres]);
        } else {
            set_genres([...selected_genres, e.target.value]);
        }
    }

    return (
        <Box className = "GenreCard__box">
            <Card variant = "outlined" className = "GenreCard__card">
                <CardContent>
                    <CardMedia
                        component = "img"
                        image = {image}
                        alt = {genre}
                        className = "GenreCard__genre-image"
                    />
                </CardContent>
                <CardActions>
                    <Button id = {`GenreCard__genre-button-${genre}`} value = {genre} onClick = {(e) => handleGenre(e)} className = "GenreCard__choice-button">{genre}</Button>
                </CardActions>
            </Card>
        </Box>
    )
} 

export default GenreCard;