import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Avatar } from "@mui/material";
import featured from "../../assets/images/NewsList/featured.png";
import entertainment from "../../assets/images/NewsList/entertainment.jpg";
import politics from "../../assets/images/NewsList/politics.jpg";
import science from "../../assets/images/NewsList/science.png";
import technology from "../../assets/images/NewsList/technology.webp";
import sports from "../../assets/images/NewsList/sports.jpg";
import "./styles.css";
import DisplayNewsList from "./DisplayNewsList";

const NewsList = () => {
    const user_genres = Cookies.get("user_genres");
    const user_positivity = Cookies.get("user_positivity");

    const [tab, setTab] = useState("featured");
    const [skip, setSkip] = useState(0);
    const [end, setEnd] = useState(false);
    const [news, setNews] = useState([]);

    // shows only selected genre tabs
    useEffect(() => {
        const showGenres = () => {
            user_genres.split(",").forEach((genre) => {
                const list_item = document.getElementsByClassName(`news-list__genre-${genre}`);
                list_item[0].style = "display: flex";
            }
            )
        };
        showGenres();
    }, [])

    const setTabGenre = (tab_name) => {
        setTab(() => tab_name);
        setSkip(0);
        setEnd(false);
        setNews([]);
    }

    return (
        <div className="news-list__container">
            <ul className="news-list__genre">
                <li key="featured" onClick={() => setTabGenre("featured")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={featured}
                        alt="featured"
                        className={
                            tab === "featured"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
                <li className="news-list__genre-Entertainment" key="Entertainment" onClick={() => setTabGenre("entertainment")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={entertainment}
                        alt="entertainment"
                        className={
                            tab === "entertainment"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
                <li className="news-list__genre-Politics" key="Politics" onClick={() => setTabGenre("politics")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={politics}
                        alt="politics"
                        className={
                            tab === "politics"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
                <li className="news-list__genre-Science" key="Science" onClick={() => setTabGenre("science")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={science}
                        alt="science"
                        className={
                            tab === "science"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
                <li className="news-list__genre-Technology" key="Technology" onClick={() => setTabGenre("technology")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={technology}
                        alt="technology"
                        className={
                            tab === "technology"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
                <li className="news-list__genre-Sports" key="Sports" onClick={() => setTabGenre("sports")}>
                    <Avatar
                        sx={{ height: "50px", width: "50px" }}
                        src={sports}
                        alt="sports"
                        className={
                            tab === "sports"
                                ? "news-list__genre-item active"
                                : "news-list__genre-item"
                        }
                    />
                </li>
            </ul>
            <div>
                <DisplayNewsList 
                    user_genres = {user_genres} 
                    user_positivity = {user_positivity} 
                    genre={tab} 
                    skip = {skip} 
                    news = {news}
                    setNews = {setNews}
                    setSkip = {setSkip}
                    end = {end}
                    setEnd = {setEnd} />
            </div>
        </div>
    );
};

export default NewsList;
