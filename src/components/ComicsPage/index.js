import React, { useEffect, useState } from "react";
import axios from "axios";
import Comics from "../../assets/images/Comics";
import ComicCard from "./ComicCard";
import { Modal, Box, Typography, Input, Button } from "@mui/material";
import { CheckRounded, KeyboardArrowUp } from "@mui/icons-material";

import "./styles.css";

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
    const [tab, setTab] = useState("bignate");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [current_comic, setCurrent_comic] = useState("");
    const [comics, setComics] = useState([]);
    const [end, setEnd] = useState(false);
    const [modalLink, setModalLink] = useState(null);

    const handleOpen = () => setOpen((prev) => !prev);

    const listComics = async () => {
        setEnd(false);
        const response = await axios({
            url: `${process.env.REACT_APP_API}/comics/${tab}`,
            method: "GET",
            params: { page: page },
        });
        setComics([...comics, ...response.data]);
        if (response.data.length === 0) {
            setEnd(true);
        }
    };

    const setTabComic = (tab_name) => {
        setComics([]);
        setTab(tab_name);
        setPage(0);
        setEnd(false);
    };

    useEffect(() => {
        listComics();
        if (document.getElementById(`move-to-top`)) {
            document.addEventListener("scroll", handleScroll)
        }
    }, [tab, page]);

    const handleScroll = () => {
        var scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollToTopBtn = document.getElementById(`move-to-top`);
        if (scrollToTopBtn) {
            if ((document.documentElement.scrollTop / scrollTotal) > 0.10) {
                // Show button
                scrollToTopBtn.classList.add("showBtn")
            } else {
                // Hide button
                scrollToTopBtn.classList.remove("showBtn")
            }
        }
    }

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

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
                    comics.map((c, index) => (
                        <ComicCard
                            name={c.name}
                            open={handleOpen}
                            setCurrent={setCurrent_comic}
                            image={c.link}
                            source={c.source}
                            id={c._id}
                            modalLink={modalLink}
                            setModalLink={setModalLink}
                            key={c.index}
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

            <div className="display-news__load-more"
            >
                {(comics.length) && !end ? (
                    <Button className="display-comics__load-more" onClick={() => setPage(prev => prev + 1)}>
                        Load More Comics
                    </Button>
                ) : (
                    <p>
                        You reached the end.
                        <CheckRounded id="display-news__check" />
                    </p>
                )}
            </div>
            <div id="move-to-top">
                <Button
                    onClick={scrollToTop}>
                    <KeyboardArrowUp />
                </Button>
            </div>
        </div>
    );
};

export default ComicsPage;
