import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import userContext from "../../context/userContext";
import { AiOutlineSearch, AiOutlineLogout, AiOutlineEdit } from "react-icons/ai";
import { BiNews, BiBookOpen } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdGames } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Button, Menu, MenuItem, Divider } from "@mui/material";

import "./styles.css";
import FirstLight from "../../assets/images/FirstLight_No_Text.png";

const BottomNav = () => {

    const [search, setSearch] = useState("");
    const [user, setUser] = useContext(userContext);

    // for games menu
    const [gameAnchor, setGameAnchor] = useState(null);
    const gameMenuOpen = Boolean(gameAnchor);

    const handleGameClick = (e) => {
        setGameAnchor(e.currentTarget);
    };
    const handleGameClose = () => {
        setGameAnchor(null);
    };

    // for settings menu
    const [settingAnchor, setSettingAnchor] = useState(null);
    const settingMenuOpen = Boolean(settingAnchor);

    const handleSettingClick = (e) => {
        setSettingAnchor(e.currentTarget);
    };
    const handleSettingClose = () => {
        setSettingAnchor(null);
    };

    const handleLogout = () => {
        handleSettingClose();
        setUser(() => null);
        Cookies.remove('user_genres');
        Cookies.remove('user_positivity');
    }

    const updateSearch = (e) => {
        setSearch(() => e.target.value);
        console.log(search);
    };

    const clearSearch = () => {
        setSearch(() => "");
    };

    const handleSearch = () => {
        if (document.getElementById(`BottomNav__search-box`).className === `BottomNav__search`) {
            document.getElementById(`BottomNav__search-backdrop-disable`).id = `BottomNav__search-backdrop`;
            document.getElementById(`BottomNav__search-box`).className = `BottomNav__search-active`;
        } else {
            document.getElementById(`BottomNav__search-backdrop`).id = `BottomNav__search-backdrop-disable`;
            document.getElementById(`BottomNav__search-box`).className = `BottomNav__search`;
        }
    }

    return (
        <div className="BottomNav">
            <div id="BottomNav__search-backdrop-disable"></div>
            <div id="BottomNav__search-box" className="BottomNav__search">
                <AiOutlineSearch />
                <input
                    type="text"
                    placeholder="Search"
                    onChange={updateSearch}
                    value={search}
                ></input>
                <FaTimes onClick={clearSearch} />
            </div>
            <div className="BottomNav__nav">
                <Button onClick={handleSearch} value="search" className="BottomNav__nav-item">
                    <AiOutlineSearch className="BottomNav__nav-item-icon" />
                    <h6 className="BottomNav__nav-item-text">Search</h6>
                </Button>
                <Button value="news" className="BottomNav__nav-item">
                    <Link className="Bottom__nav-item-link" to="/news">
                        <BiNews className="BottomNav__nav-item-icon" />
                        <h6 className="BottomNav__nav-item-text">News</h6>
                    </Link>
                </Button>

                <img onClick={handleSettingClick} src={FirstLight} alt="logo" />
                <Menu
                    className="BottomNav__settings-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={settingAnchor}
                    open={settingMenuOpen}
                    onClose={handleSettingClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem className="BottomNav__settings-menu-item" onClick={handleSettingClose}>
                        <Link className="Bottom__nav-item-link" to="/preferences">
                            <AiOutlineEdit /> Preferences
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem className="BottomNav__settings-menu-item" onClick={handleLogout}>
                        <AiOutlineLogout /> Logout
                    </MenuItem>
                </Menu>

                <Button value="comics" className="BottomNav__nav-item">
                    <Link className="Bottom__nav-item-link" to="/comics">
                        <BiBookOpen className="BottomNav__nav-item-icon" />
                        <h6 className="BottomNav__nav-item-text">Comics</h6>
                    </Link>
                </Button>
                <Button onClick={handleGameClick} value="games" className="BottomNav__nav-item">
                    <IoGameControllerOutline className="BottomNav__nav-item-icon" />
                    <h6 className="BottomNav__nav-item-text">Games</h6>
                </Button>
                <Menu
                    className="BottomNav__settings-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={gameAnchor}
                    open={gameMenuOpen}
                    onClose={handleGameClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem className="top-nav__settings-menu-item" onClick={handleGameClose}>
                        <Link className="Bottom__nav-item-link" to="/games/maze-solver">
                            <MdGames /> Maze
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem className="top-nav__settings-menu-item" onClick={handleGameClose}>
                        <Link className="Bottom__nav-item-link" to="/games/sudoku">
                            <MdGames /> Sudoku
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem className="top-nav__settings-menu-item" onClick={handleGameClose}>
                        <Link className="Bottom__nav-item-link" to="/games/tic-tac-toe">
                            <MdGames /> Tic Tac Toe
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default BottomNav;