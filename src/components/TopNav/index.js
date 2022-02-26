import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import userContext from "../../context/userContext";
import "./styles.css";
import Logo from "../../assets/images/FirstLight-Rebrand.png";
import { Avatar, Tooltip, Menu, MenuItem, Divider, List, ListItem, ListItemText, Button } from "@mui/material";
import { MdGames } from "react-icons/md";
import { BiNews, BiBookOpen, BiLogIn } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import {
    AiOutlineSearch,
    AiOutlineLogout,
    AiOutlineEdit,
} from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Modal from "@mui/material/Modal"

import Placeholder from "../../assets/images/placeholder.svg";
import TC from "../../assets/images/NewsLogos/techcrunch.png";
import BBC from "../../assets/images/NewsLogos/bbc.png";
import CNN from "../../assets/images/NewsLogos/cnn.jpg";
import NDTV from "../../assets/images/NewsLogos/ndtv.png";
import FL from "../../assets/images/FirstLight-Radial.png";

const TopNav = ({history}) => {
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
        const checkIfClickedOutside = (e) => {
            if (searchOpen && ref.current && !ref.current.contains(e.target)) {
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
        localStorage.removeItem("avatar");
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchresults([]);
        setSearchOpen(true);
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
        setSearchOpen(false);
        setNores(false);
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function trim(str) {
        if (str.length > 90) {
            return str.substr(0, 90) + "...";
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
        <header className="top-nav__header">
            <Link to="/"><img src={Logo} className="top-nav__image" alt="logo" /></Link>
            {user ? (
                <>
                    <div className="top-nav__search">
                        <form onSubmit={handleSubmit} autoComplete="off">
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
                            <div className="top-nav__search-results" ref={ref}>
                                <List>
                                    {searchresults.map((s) => (
                                        <ListItem className="top-nav__search-results-item">
                                            <img className="top-nav__search-results-item-image" src={s.image_link.length === 0 ? Placeholder : s.image_link} alt="news-img" />
                                            <Link to={`/news/${s._id}`} onClick={()=>clearSearch()}>
                                                <ListItemText
                                                    primary={trim(s.title)}
                                                />
                                                <div className="top-nav__search-results-info">
                                                    <p className="top-nav__search-results-genre">{toTitleCase(s.genre)}</p>
                                                    <p className="top-nav__search-results-positivity">Score: {s.positivity_score}</p>
                                                    <img className="top-nav__search-results-source" src={linklogo(s.link)} alt="source" />
                                                </div>
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        ) : (
                            loading ? (
                                <div className="top-nav__search-results top-nav__search-load">
                                    <h3>Loading...</h3>
                                    <img src={FL} alt="loader" className="top-nav__search-loader" />
                                </div>
                            ) : (
                                nores ? (
                                    <div className="top-nav__search-results" ref={ref}>
                                        <h3>No results found.</h3>
                                    </div>
                                ) : (
                                    <></>
                                )
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
                                        <img src={localStorage.avatar} alt="avatar" />
                                    </Avatar>
                                    {/* <img className="top-nav__settings" onClick={handleSettingClick}  src={localStorage.avatar}/> */}
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
                </>
            ) : (
                <GoogleLogin
                    className="top-nav__google-login"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="LogIn/ SignUp"
                    render={renderProps => (
                        <Button id="SignUp__btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
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
        </header>
    );
};

export default withRouter(TopNav);
