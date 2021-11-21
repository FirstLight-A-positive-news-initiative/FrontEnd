import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { GoogleLogout } from "react-google-login";
import userContext from "../../context/userContext";
import "./styles.css";
import Logo from "../../assets/images/FirstLight_text_crop.png";
import { Avatar, Tooltip, Menu, MenuItem, Divider, List, ListItem, ListItemText } from "@mui/material";
import { MdGames } from "react-icons/md";
import { BiNews, BiBookOpen } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import {
    AiOutlineSearch,
    AiOutlineLogout,
    AiOutlineEdit,
} from "react-icons/ai";
import { FaTimes, FaRegUser } from "react-icons/fa";

import TC from "../../assets/images/NewsLogos/techcrunch.png";
import BBC from "../../assets/images/NewsLogos/bbc.png";
import CNN from "../../assets/images/NewsLogos/cnn.jpg";
import NDTV from "../../assets/images/NewsLogos/ndtv.png";
import FL from "../../assets/images/FirstLight_No_Text.png";

const TopNav = (props) => {
    const [search, setSearch] = useState("");
    const [searchresults, setSearchresults] = useState([]);
    const [nores, setNores] = useState(false);
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
        localStorage.removeItem("firstlightUser");
        Cookies.remove("user_genres");
        Cookies.remove("user_positivity");
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (search.trim() !== "") {
            const results = await axios(
                {
                    url: `${process.env.REACT_APP_API}/news/search/${search}`,
                    method: "GET",
                }
            )
            if (results.data.length === 0) {
                setNores(true);
            } else {
                setNores(false);
            }

            setSearchresults(results.data);
        } else {
            setSearchresults([]);
        }
    }

    const clearSearch = () => {
        setSearch("");
        setSearchresults([]);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const linklogo = (str)=>{
        if(str.includes('techcrunch')){
            return TC;
        } else if(str.includes('bbc')){
            return BBC;
        } else if(str.includes('cnn')){
            return CNN;
        } else if(str.includes('ndtv')){
            return NDTV;
        } else{
            return FL;
        }
    }

    return (
        <header className="top-nav__header">
            <Link to="/"><img src={Logo} className="top-nav__image" alt="logo" /></Link>
            <div className="top-nav__search">
                <form onSubmit={handleSubmit}>
                    <AiOutlineSearch />
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={updateSearch}
                        value={search}
                    ></input>
                    <FaTimes onClick={clearSearch} />
                </form>

                {searchresults && searchresults.length ? (
                    <div className="top-nav__search-results">
                        <h3>Results</h3>
                        <hr />
                        <List>
                            {searchresults.map((s) => (
                                <ListItem className="top-nav__search-results-item">
                                    <img src={s.image_link} alt="news-img" />
                                    <Link to={`/news/${s._id}`} target="_blank">
                                        <ListItemText
                                            primary={s.title}
                                            secondary={toTitleCase(s.genre)}
                                        />
                                        <img className="top-nav__search-results-source" src={linklogo(s.link)} alt="source" />
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </div>

                ) : (
                        nores ? (
                            <div className="top-nav__search-results">
                                <h3>No results found.</h3>
                            </div>
                        ) : (
                            <></>
                        )
                )}
            </div>

            <nav>
                <ul className="top-nav__links">
                    <li key="news">
                        <Link to="/news">
                            <BiNews
                                className="top-nav__links-icons"
                                size="25px"
                            />
                            News
                        </Link>
                    </li>
                    <li key="games" onClick={handleGameClick}>
                        <Link to="#">
                            <IoGameControllerOutline
                                className="top-nav__links-icons"
                                size="25px"
                            />
                            Games
                        </Link>
                    </li>
                    <li key="comics">
                        <Link to="/comics">
                            <BiBookOpen
                                className="top-nav__links-icons"
                                size="25px"
                            />
                            Comics
                        </Link>
                    </li>
                    <li key="settings">
                        <Tooltip title="Settings" placement="right">
                            <Avatar
                                className="top-nav__settings"
                                onClick={handleSettingClick}
                            >
                                <FaRegUser />
                            </Avatar>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
            {/* Game Section */}
            <Menu
                anchorEl={gameAnchor}
                open={gameMenuOpen}
                onClose={handleGameClose}
                className="top-nav__games-menu"
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    className="top-nav__settings-menu-item"
                    onClick={handleGameClose}
                >
                    <Link to="/games/maze-solver">
                        <MdGames />
                        Maze
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem
                    className="top-nav__settings-menu-item"
                    onClick={handleGameClose}
                >
                    <Link to="/games/sudoku">
                        <MdGames />
                        Sudoku
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem
                    className="top-nav__settings-menu-item"
                    onClick={handleGameClose}
                >
                    <Link to="/games/tic-tac-toe">
                        <MdGames />
                        Tic Tac Toe
                    </Link>
                </MenuItem>
            </Menu>
            {/* user settings */}
            <Menu
                anchorEl={settingAnchor}
                open={settingMenuOpen}
                className="top-nav__settings-menu"
                id="basic-menu"
                onClose={handleSettingClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem
                    className="top-nav__settings-menu-item"
                    onClick={handleSettingClose}
                >
                    <Link to="/preferences">
                        <AiOutlineEdit /> Preferences
                    </Link>
                </MenuItem>
                <Divider />

                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    render={(renderProps) => (
                        <MenuItem
                            className="top-nav__settings-menu-item"
                            onClick={handleLogout}
                        >
                            {" "}
                            <AiOutlineLogout />
                            Logout
                        </MenuItem>
                    )}
                    onLogoutSuccess={handleLogout}
                ></GoogleLogout>
            </Menu>
        </header>
    );
};

export default TopNav;
