import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Comics from "../../assets/images/Comics";
import ComicCard from "./ComicCard";
import { Modal, Box, Typography, Input, Button } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";

import "./styles.css";
import Logo from "../../assets/images/FirstLight_No_Text.png";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ComicsPage = () => {
    const [tab, setTab] = useState("calvinandhobbes");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [current_comic, setCurrent_comic] = useState("");
    const [comics, setComics] = useState([]);
    const [end, setEnd] = useState(false);
    const [modalLink, setModalLink] = useState(null);

    const handleOpen = () => setOpen((prev) => !prev);

    // infinite scroll intersection observer
    const [element, setElement] = useState(null);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];

                if (first.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                threshold: 1,
            }
        )
    );

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

    const listComics = async () => {
        const response = await axios({
            url: `${process.env.REACT_APP_API}/comics/${tab}`,
            method: "GET",
            params: { page: page },
        });
        if (response.data.length === 0) {
            setEnd(true);
        }
        setComics([...comics, ...response.data]);
    };

    const setTabComic = (tab_name) => {
        setComics([]);
        setTab(tab_name);
        setPage(0);
        setEnd(false);
    };

    useEffect(() => {
        listComics();
    }, [tab, page]);

    return (
        <div className="ComicsPage">
            <div className="ComicsPage__header">
                {Comics &&
                    Comics.map((c) => (
                        <img
                            key={c[0]}
                            onClick={() => {
                                setTabComic(c[0]);
                            }}
                            className={
                                tab === c[0]
                                    ? `ComicsPage__header-image-active`
                                    : `ComicsPage__header-image`
                            }
                            src={c[1]}
                            alt="comic-logo"
                        />
                    ))}
            </div>
            <div className="ComicsPage__comics">
                <Modal
                    open={modalLink !== null}
                    onClose={() => setModalLink(() => null)}
                >
                    <Box className="display-news__share-modal" sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Share this Comic with your friends!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Input
                                value={`${window.location.origin}/comics/${modalLink}`}
                                id="copy_link-comics"
                            ></Input>{" "}
                            <Button
                                onClick={() => {
                                    const copy_text =
                                        document.getElementById(
                                            "copy_link-comics"
                                        );
                                    copy_text.select();
                                    console.log(copy_text);
                                    document.execCommand("copy");
                                    navigator.clipboard.writeText(
                                        `Hey! Check out this comic on Firstlight. Firstlight is the best news app ever!\n\n${window.location.origin}/comics/${modalLink}`
                                    );
                                }}
                            >
                                Copy Link
                            </Button>
                        </Typography>
                    </Box>
                </Modal>

                {comics && comics.length ? (
                    comics.map((c) => (
                        <ComicCard
                            name={c.name}
                            open={handleOpen}
                            setCurrent={setCurrent_comic}
                            image={c.link}
                            source={c.source}
                            id={c._id}
                            modalLink={modalLink}
                            setModalLink={setModalLink}
                            key={c._id}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
            <Modal
                className="ComicsPage__modal"
                open={open}
                onClose={handleOpen}
            >
                <img
                    className="ComicsPage__modal-image"
                    src={current_comic}
                    alt="comic-large"
                />
            </Modal>

            <div
                ref={setElement}
                className="display-news__load-more display-comics__load-more"
            >
                {(comics.length || page === 0) && !end ? (
                    <p>
                        Loading Comics...
                        <img
                            src={Logo}
                            id="display-news__logo-loader"
                            alt="Logo-loader"
                        />
                    </p>
                ) : (
                    <p>
                        You reached the end.
                        <CheckRounded id="display-news__check" />
                    </p>
                )}
            </div>
        </div>
    );
};

export default ComicsPage;
