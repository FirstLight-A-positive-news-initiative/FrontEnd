import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GoogleLogout } from "react-google-login";
import userContext from "../../context/userContext";
import "./styles.css";
import Logo from "../../assets/images/FirstLight_text_crop.png";
import { Avatar, Tooltip, Menu, MenuItem, Divider } from "@mui/material";
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

    // for settings menu
    const [menuopen, setMenuopen] = useState(false);
    const handleClick = () => {
        setMenuopen((prev) => !prev);
    };
    const handleClose = () => {
        setMenuopen(false);
    };

    const handleLogout = () => {
        handleClose();
        setUser(() => null);
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
                    <li key="games">
                        <Link to="/games/sudoku">
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
                                onClick={handleClick}
                            >
                                <FaRegUser />
                            </Avatar>
                        </Tooltip>
                    </li>
                </ul>
            </nav>
            <Menu
                className="top-nav__settings-menu"
                open={menuopen}
                id="basic-menu"
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                <MenuItem
                    className="top-nav__settings-menu-item"
                    onClick={handleClose}
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
