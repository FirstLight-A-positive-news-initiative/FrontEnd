import React from "react";
import { Card, CardContent, IconButton, Button } from "@mui/material";
import { Bookmark, Share } from "@mui/icons-material";

import "./styles.css";

const ComicCard = ({ name, image, setCurrent, open, source, id, modalLink, setModalLink }) => {

    const handleClick = () => {
        setCurrent(image);
        open();
    }

    return (
        <Card className="ComicCard">
            <p className="ComicCard__heading">{name}</p>
            <div class="ComicCard__buttons">
                <Button>
                    <a href = {source} target = "_blank">
                        {source.split(`.`)[1]}
                    </a>
                </Button>
                <Button 
                    variant="outlined"
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: `${name}`,
                                url: `Hey! Check out this Comic on Firstlight.\n\nhttp://localhost:3000/comics/${id}`,
                            });
                        } else {
                            setModalLink(() => id);
                        }
                    }}
                >
                    Share
                    <IconButton aria-label="share">
                        <Share sx={{ fontSize: "1.25rem", color: 'black' }} />
                    </IconButton>
                </Button>

                {/* <IconButton aria-label="share">
                    <Bookmark sx={{fontSize:"1.25rem", color: 'black'}} />
                </IconButton> */}
            </div>
            <CardContent className="ComicCard__card">
                <img
                    src={image}
                    alt="comicstrip"
                    className="ComicCard__card-image"
                    onClick={handleClick}
                />
            </CardContent>
        </Card>
    )
}

export default ComicCard;