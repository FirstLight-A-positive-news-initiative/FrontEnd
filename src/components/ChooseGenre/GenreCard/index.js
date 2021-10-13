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
        var idx = selected_genres.indexOf(e.target.value);
        if(idx !== -1) {
            selected_genres.splice(idx, 1);
            set_genres([...selected_genres]);

            var curr_button = document.getElementById(e.target.id);
            curr_button.classList.add(`GenreCard__choice-button-selected`);
        } else {
            set_genres([...selected_genres, e.target.value]);

            var curr_button = document.getElementById(e.target.id);
            curr_button.classList.remove(`GenreCard__choice-button-selected`);
        }
        console.log(selected_genres);
        return;
    }

    return (
        <Box>
            <Card variant = "outlined" sx={{ maxWidth: 275 }} className = "GenreCard__card">
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