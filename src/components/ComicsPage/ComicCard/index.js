import React from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import { Bookmark, Share } from "@mui/icons-material";

import "./styles.css";

const ComicCard = ({ image, setCurrent, open }) => {

    const handleClick = () => {
        setCurrent(image);
        open();
    }

    return (
        <Card className = "ComicCard">
            <p className = "ComicCard__heading">Calvin and Hobbs</p>
            <div class = "ComicCard__buttons">
                <IconButton aria-label="share">
                    <Share sx={{fontSize:"1.25rem", color: 'black'}} />
                </IconButton>
                <IconButton aria-label="share">
                    <Bookmark sx={{fontSize:"1.25rem", color: 'black'}} />
                </IconButton>
            </div>
            <CardContent className = "ComicCard__card">
                <img 
                    src = {image}
                    alt = "comicstrip"
                    className = "ComicCard__card-image"
                    onClick = {handleClick}
                />
            </CardContent>
        </Card>
    )
}

export default ComicCard;