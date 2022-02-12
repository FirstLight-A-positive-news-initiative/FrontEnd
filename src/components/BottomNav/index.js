import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Cookies from "js-cookie";
import userContext from "../../context/userContext";
import {
    AiOutlineSearch,
    AiOutlineLogout,
    AiOutlineEdit,
} from "react-icons/ai";
import { BiNews, BiBookOpen, BiLogIn } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdGames } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button, Menu, MenuItem, Divider, List, ListItem, ListItemText } from "@mui/material";

import "./styles.css";
import FirstLight from "../../assets/images/FirstLight-Radial.png";

import Placeholder from "../../assets/images/placeholder.svg";
import TC from "../../assets/images/NewsLogos/techcrunch.png";
import BBC from "../../assets/images/NewsLogos/bbc.png";
import CNN from "../../assets/images/NewsLogos/cnn.jpg";
import NDTV from "../../assets/images/NewsLogos/ndtv.png";
import FL from "../../assets/images/FirstLight-Radial.png";

const BottomNav = () => {
    const ref = useRef();
    const [search, setSearch] = useState("");
    const [searchresults, setSearchresults] = useState([]);
    const [nores, setNores] = useState(false);
    // eslint-disable-next-line
    const [user, setUser] = useContext(userContext);
    const [loading, setLoading] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    //Login
    const responseGoogle = async (res) => {
        const googleUser = res.profileObj;
        // check if user already had an account
        axios
            .get(`${process.env.REACT_APP_API}/users/${googleUser.email}`)
            .then((res) => {
                localStorage.setItem(
                    "firstlightUser",
                    JSON.stringify(res.data)
                );
                localStorage.setItem(
                    "avatar", googleUser.imageUrl
                )
                setUser(() => res.data);
            })
            .catch((err) => {
                console.log("err: ", err);
                const firstLightUser = {
                    name: googleUser.givenName + " " + googleUser.familyName,
                    email: googleUser.email,
                };
                localStorage.setItem(
                    "firstlightUser",
                    JSON.stringify(firstLightUser)
                );
                localStorage.setItem(
                    "avatar", googleUser.imageUrl
                )
                setUser(() => firstLightUser);
                history.push("/preferences");
            });
    };

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (searchOpen && ref.current && !ref.current.contains(e.target)) {
                handleSearch();
                clearSearch();
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [searchOpen]);

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
        setSearchresults([]);
        if (search.trim() !== "") {
            setLoading(true);
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

            setLoading(false);
            setSearchresults(results.data);
        } else {
            setSearchresults([]);
        }
    }

    const clearSearch = () => {
        setSearch("");
        setSearchresults([]);
    };

    const handleSearch = () => {
        if (
            document.getElementById(`BottomNav__search-box`).className ===
            `BottomNav__search`
        ) {
            document.getElementById(
                `BottomNav__search-backdrop-disable`
            ).id = `BottomNav__search-backdrop`;
            document.getElementById(
                `BottomNav__search-box`
            ).className = `BottomNav__search-active`;
        } else {
            document.getElementById(
                `BottomNav__search-backdrop`
            ).id = `BottomNav__search-backdrop-disable`;
            document.getElementById(
                `BottomNav__search-box`
            ).className = `BottomNav__search`;
        }
        setSearchOpen(!searchOpen);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function trim(str) {
        if (str.length > 25) {
            return str.substr(0, 25) + "...";
        }
        return str;
    }

    const linklogo = (str) => {
        if (str.includes('techcrunch')) {
            return TC;
        } else if (str.includes('bbc')) {
            return BBC;
        } else if (str.includes('cnn')) {
            return CNN;
        } else if (str.includes('ndtv')) {
            return NDTV;
        } else {
            return FL;
        }
    }

    return (
        <div className="BottomNav">
            <div id="BottomNav__search-backdrop-disable"></div>

            <div id="BottomNav__search-box" className="BottomNav__search" ref={ref}>
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
                    <div className="BottomNav__search-results">
                        <List>
                            {searchresults.map((s) => (
                                <ListItem className="BottomNav__search_results-item">
                                    <img src={s.image_link.length === 0 ? Placeholder : s.image_link} alt="news-img" />
                                    <Link to={`/news/${s._id}`} target="_blank">
                                        <ListItemText
                                            primary={trim(s.title)}
                                        />
                                        <div className="BottomNav__search-results-info">
                                            <p className="BottomNav__search-results-genre">{toTitleCase(s.genre)}</p>
                                            <p className="BottomNav__search-results-positivity">Score: {s.positivity_score}</p>
                                            <img className="BottomNav__search-results-source" src={linklogo(s.link)} alt="source" />
                                        </div>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                ) : (
                    loading ? (
                        <div className="BottomNav__search-results BottomNav__search-load">
                            <h3>Loading...</h3>
                            <img src={FL} alt="loader" className="top-nav__search-loader" />
                        </div>
                    ) : (
                        nores ? (
                            <div className="BottomNav__search-results">
                                <h3>No results found.</h3>
                            </div>
                        ) : (
                            <></>
                        )
                    )
                )}
            </div>

            <div className="BottomNav__nav" style={user ? {padding: "1%"}: {}}>
                {user ? (
                    <>
                        <Button
                            onClick={handleSearch}
                            value="search"
                            className="BottomNav__nav-item"
                        >
                            <AiOutlineSearch className="BottomNav__nav-item-icon" />
                            <h6 className="BottomNav__nav-item-text">Search</h6>
                        </Button>
                        <Button value="news" className="BottomNav__nav-item">
                            <Link className="Bottom__nav-item-link" to="/featured">
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
                                vertical: "top",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "center",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem
                                className="BottomNav__settings-menu-item"
                                onClick={handleSettingClose}
                            >
                                <Link
                                    className="Bottom__nav-item-link"
                                    to="/preferences"
                                >
                                    <AiOutlineEdit /> Preferences
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                className="BottomNav__settings-menu-item"
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout /> Logout
                            </MenuItem>
                        </Menu>

                        <Button value="comics" className="BottomNav__nav-item">
                            <Link className="Bottom__nav-item-link" to="/comics">
                                <BiBookOpen className="BottomNav__nav-item-icon" />
                                <h6 className="BottomNav__nav-item-text">Comics</h6>
                            </Link>
                        </Button>
                        <Button
                            onClick={handleGameClick}
                            value="games"
                            className="BottomNav__nav-item"
                        >
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
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "center",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem
                                className="top-nav__settings-menu-item"
                                onClick={handleGameClose}
                            >
                                <Link
                                    className="Bottom__nav-item-link"
                                    to="/games/maze-solver"
                                >
                                    <MdGames /> Maze
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                className="top-nav__settings-menu-item"
                                onClick={handleGameClose}
                            >
                                <Link
                                    className="Bottom__nav-item-link"
                                    to="/games/sudoku"
                                >
                                    <MdGames /> Sudoku
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                className="top-nav__settings-menu-item"
                                onClick={handleGameClose}
                            >
                                <Link
                                    className="Bottom__nav-item-link"
                                    to="/games/tic-tac-toe"
                                >
                                    <MdGames /> Tic Tac Toe
                                </Link>
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <GoogleLogin
                    className="top-nav__google-login"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="LogIn/ SignUp"
                    render={renderProps => (
                        <Button id="SignUp__btn-mobile" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <FcGoogle id="SignUp__icon" />
                            LogIn/ SignUp
                        </Button>
                    )}
                    icon={false}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
                )}
            </div>
        </div>
    );
};

export default withRouter(BottomNav);
