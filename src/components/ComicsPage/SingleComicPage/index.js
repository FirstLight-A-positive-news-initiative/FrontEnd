import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Card, Button, CardContent } from "@mui/material";

import Logo from "../../../assets/images/FirstLight-Radial.png";
import "./styles.css";

const SingleComic = () => {
    const { id } = useParams();
    const [curr, setCurr] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((prev) => (!prev));

    const handleClick = () => {
        handleOpen();
    }

    const getComic = async () => {
        const comic = await axios(
            {
                url: `${process.env.REACT_APP_API}/comics/single/${id}`,
                method: "GET",
            }
        )

        setCurr(comic.data);
    }

    useEffect(() => {
        getComic();
    }, []);

    return (
        <div className="SingleComic">
            {curr ? (
                <div>
                    <h1 className="SingleComic__heading">Hey there! Check out this comicstrip.</h1>
                    <Card className="SingleComic__ComicCard">
                        <p className="ComicCard__heading">{curr.name}</p>
                        <div class="ComicCard__buttons">
                            <Button>
                                <a href={curr.source} target="_blank" rel="noopener noreferrer">
                                    {curr.source.split(`.`)[1]}
                                </a>
                            </Button>
                        </div>
                        <CardContent className="ComicCard__card">
                            <img
                                src={curr.link}
                                alt="comicstrip"
                                className="ComicCard__card-image SingleComic__img"
                                onClick={handleClick}
                            />
                        </CardContent>
                    </Card>
                    <Modal className="ComicsPage__modal" open={open} onClose={handleOpen}>
                        <img className="ComicsPage__modal-image" src={curr.link} alt="comic-large" />
                    </Modal>
                    <h1 className="SingleComic__heading">For more such comics, visit FirstLight- A Positive News Initiative.</h1>
                </div>
            ) : (
                <p>
                    Loading Comic...
                    <img
                        src={Logo}
                        id="display-news__logo-loader"
                        alt="Logo-loader"
                    />
                </p>
            )}
        </div>
    )
}

export default SingleComic;