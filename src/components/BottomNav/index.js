import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BiNews, BiBookOpen } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { Button } from "@mui/material";

import "./styles.css";
import FirstLight from "../../assets/images/FirstLight_No_Text.png";

const BottomNav = () => {

    const [search, setSearch] = useState("");

    const updateSearch = (e) => {
        setSearch(() => e.target.value);
        console.log(search);
    };

    const clearSearch = () => {
        setSearch(() => "");
    };

    const handleSearch = () => {
        if(document.getElementById(`BottomNav__search-box`).className === `BottomNav__search`) {
            document.getElementById(`BottomNav__search-box`).className = `BottomNav__search-active`;
        } else {
            document.getElementById(`BottomNav__search-box`).className = `BottomNav__search`;
        }
    }

    return (
        <div className = "BottomNav">
            <div id = "BottomNav__search-box" className="BottomNav__search">
                <AiOutlineSearch />
                <input
                    type="text"
                    placeholder="Search"
                    onChange={updateSearch}
                    value={search}
                ></input>
                <FaTimes onClick={clearSearch} />
            </div>
            <div className = "BottomNav__nav">
                <Button onClick = {handleSearch} value = "search" className = "BottomNav__nav-item">
                    <AiOutlineSearch className = "BottomNav__nav-item-icon" /> 
                    <h6 className = "BottomNav__nav-item-text">Search</h6>
                </Button>
                <Button value = "news" className = "BottomNav__nav-item">
                    <Link className = "Bottom__nav-item-link" to="/news">
                        <BiNews className = "BottomNav__nav-item-icon" />
                        <h6 className = "BottomNav__nav-item-text">News</h6>
                    </Link>
                </Button>

                <img src = {FirstLight} />

                <Button value = "comics" className = "BottomNav__nav-item">
                    <Link className = "Bottom__nav-item-link" to = "/comics">
                        <BiBookOpen className = "BottomNav__nav-item-icon" />
                        <h6 className = "BottomNav__nav-item-text">Comics</h6>
                    </Link>
                </Button>
                <Button value = "games" className = "BottomNav__nav-item">
                    <Link className = "Bottom__nav-item-link" to = "/games">
                        <IoGameControllerOutline className = "BottomNav__nav-item-icon" />
                        <h6 className = "BottomNav__nav-item-text">Games</h6>
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default BottomNav;