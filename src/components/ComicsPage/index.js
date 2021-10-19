import React, { useState } from "react";
import Comics from "../../assets/images/Comics";
import ComicCard from "./ComicCard";
import { Modal } from "@mui/material";

import "./styles.css";

const ComicsPage = () => {
    const [tab, setTab] = useState("BC");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((prev) => (!prev));
    const [current_comic, setCurrent_comic] = useState("");

    return (
        <div className = "ComicsPage">
            <div className = "ComicsPage__header">
                {Comics.map((c) => (
                    <img key = {c[0]} onClick = {() => setTab(c[0])} className = {(tab === c[0]) ? 
                        `ComicsPage__header-image-active` :
                        `ComicsPage__header-image`} src = {c[1]} alt = "comic-logo" />
                ))}
            </div>
            <div className = "ComicsPage__comics">
                    <ComicCard open = {handleOpen} setCurrent = {setCurrent_comic} image = "https://assets.amuniversal.com/85d9d8c0f49b0139779a005056a9545d" />
                    <ComicCard open = {handleOpen} setCurrent = {setCurrent_comic} image = "https://assets.amuniversal.com/852484d0f309013976ef005056a9545d" />
            </div>
            <Modal className = "ComicsPage__modal" open = {open} onClose = {handleOpen}>
                <img className = "ComicsPage__modal-image" src = {current_comic} alt = "comic-large" />
            </Modal>
        </div>
    )
}

export default ComicsPage;