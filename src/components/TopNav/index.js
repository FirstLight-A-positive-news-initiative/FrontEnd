import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GoogleLogout } from "react-google-login";
import userContext from "../../context/userContext";
import "./styles.css";
import Logo from "../../assets/images/FirstLight_text_crop.png";
import { Avatar, Tooltip, Menu, MenuItem, Divider } from "@mui/material";
import { MdGames } from "react-icons/md";
import { BiNews, BiBookOpen } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import {
    AiOutlineSearch,
    AiOutlineLogout,
    AiOutlineEdit,
} from "react-icons/ai";
import { FaTimes, FaRegUser } from "react-icons/fa";

const TopNav = (props) => {
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
        localStorage.removeItem("firstlightUser");
        Cookies.remove("user_genres");
        Cookies.remove("user_positivity");
    };

    const updateSearch = (e) => {
        setSearch(() => e.target.value);
        console.log(search);
    };

    const clearSearch = () => {
        setSearch(() => "");
    };

    return (
        <header className="top-nav__header">
            <img src={Logo} className="top-nav__image" alt="logo" />
            <div className="top-nav__search">
                <AiOutlineSearch />
                <input
                    type="text"
                    placeholder="Search"
                    onChange={updateSearch}
                    value={search}
                ></input>
                <FaTimes onClick={clearSearch} />
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
