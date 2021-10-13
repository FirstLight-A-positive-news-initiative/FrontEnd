import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Logo from "../../assets/images/FirstLight_text_crop.png";
import { BiNews, BiBookOpen } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

const TopNav = (props) => {
    const [search, setSearch] = useState("");

    const updateSearch = (e) => {
        setSearch(() => e.target.value);
        console.log(search);
    };

    const clearSearch = () => {
        setSearch(() => "");
    };

    return (
        <header className="top-nav__header">
            <img src={Logo} className="top-nav__image" />
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
                    <li>
                        <Link to="/news">
                            <BiNews class="top-nav__links-icons" size="25px" />
                            News
                        </Link>
                    </li>
                    <li>
                        <Link to="/games">
                            <IoGameControllerOutline
                                class="top-nav__links-icons"
                                size="25px"
                            />
                            Games
                        </Link>
                    </li>
                    <li>
                        <Link to="/comics">
                            <BiBookOpen
                                class="top-nav__links-icons"
                                size="25px"
                            />
                            Comics
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default TopNav;
