import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import { Share } from "@mui/icons-material";

import "./styles.css";

const ComicCard = ({
    name,
    image,
    setCurrent,
    open,
    source,
    id,
    modalLink,
    setModalLink,
}) => {
    const handleClick = () => {
        setCurrent(image);
        open();
    };

    return (
        <Card className="ComicCard">
            <p className="ComicCard__heading">{name}</p>
            <div className="ComicCard__buttons">
                <Button>
                    <a href={source} target="_blank" rel="noopener noreferrer">
                        {source.split(`.`)[1]}
                    </a>
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: `${name}`,
                                url: `/comics/${id}`,
                                text: "Hey! Check out this comic on FirstLight - A Positive News Initiative!",
                            });
                        } else {
                            setModalLink(() => id);
                        }
                    }}
                >
                    Share
                    <Share sx={{ fontSize: "1.25rem", color: "black" }} />
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
    );
};

export default ComicCard;
