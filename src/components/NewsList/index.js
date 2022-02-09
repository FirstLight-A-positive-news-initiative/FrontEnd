import React, { useState, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { Avatar, Tooltip, Button } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import featured from "../../assets/images/NewsList/featured.png";
import world from "../../assets/images/NewsList/world.png";
import india from "../../assets/images/NewsList/india.png";
import entertainment from "../../assets/images/NewsList/entertainment.jpg";
import politics from "../../assets/images/NewsList/politics.jpg";
import science from "../../assets/images/NewsList/science.png";
import technology from "../../assets/images/NewsList/technology.png";
import business from "../../assets/images/NewsList/business.png";
import health from "../../assets/images/NewsList/health.png";
import offbeat from "../../assets/images/NewsList/offbeat.png";
import sports from "../../assets/images/NewsList/sports.jpg";
import "./styles.css";
import DisplayNewsList from "./DisplayNewsList";

const NewsList = ({history}) => {
    const user_genres = JSON.parse(localStorage.getItem("firstlightUser")).genre;
    const user_positivity = JSON.parse(localStorage.getItem("firstlightUser")).positivity;

    const [tab, setTab] = useState(useLocation().pathname.substring(1));
    const [skip, setSkip] = useState(0);
    const [end, setEnd] = useState(false);
    const [news, setNews] = useState([]);

    // shows only selected genre tabs
    useEffect(() => {
        if (user_genres && user_genres.length) {
            const showGenres = () => {
                user_genres.forEach((genre) => {
                    const list_item = document.getElementsByClassName(`news-list__genre-${genre}`);
                    list_item[0].style = "display: flex";
                }
                )
            };
            showGenres();
        }
        if(document.getElementById(`move-to-top`)) {
            document.addEventListener("scroll", handleScroll)
        }
    }, [])

    const setTabGenre = (tab_name) => {
        if(tab!==tab_name){
            setNews([]);
            setTab(tab_name);
            setSkip(0);
            setEnd(false);
            history.push("/"+tab_name);
        }
    }
    
    const handleScroll = () => {
        var scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollToTopBtn = document.getElementById(`move-to-top`);
        if(scrollToTopBtn) {
            if ((document.documentElement.scrollTop / scrollTotal) > 0.10) {
                // Show button
                scrollToTopBtn.classList.add("showBtn")
            } else {
                // Hide button
                scrollToTopBtn.classList.remove("showBtn")
            }
        }
    }

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="news-list__container">
            <ul className="news-list__genre">
                <Tooltip title="Featured">
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
                </Tooltip>
                <Tooltip title="World">
                    <li className="news-list__genre-World" key="World" onClick={() => setTabGenre("world")}>
                        <Avatar
                            sx={{ height: "50px", width: "50px" }}
                            src={world}
                            alt="world"
                            className={
                                tab === "world"
                                    ? "news-list__genre-item active"
                                    : "news-list__genre-item"
                            }
                        />
                    </li>
                </Tooltip>
                <Tooltip title="India">
                    <li className="news-list__genre-India" key="India" onClick={() => setTabGenre("india")}>
                        <Avatar
                            sx={{ height: "50px", width: "50px" }}
                            src={india}
                            alt="india"
                            className={
                                tab === "india"
                                    ? "news-list__genre-item active"
                                    : "news-list__genre-item"
                            }
                        />
                    </li>
                </Tooltip>
                <Tooltip title="Entertainment">
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
                </Tooltip>
                <Tooltip title="Politics">
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
                </Tooltip>
                <Tooltip title="Science">
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
                </Tooltip>
                <Tooltip title="Technology">
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
                </Tooltip>
                <Tooltip title="Business">
                    <li className="news-list__genre-Business" key="Business" onClick={() => setTabGenre("business")}>
                        <Avatar
                            sx={{ height: "50px", width: "50px" }}
                            src={business}
                            alt="business"
                            className={
                                tab === "business"
                                    ? "news-list__genre-item active"
                                    : "news-list__genre-item"
                            }
                        />
                    </li>
                </Tooltip>
                <Tooltip title="Health">
                    <li className="news-list__genre-Health" key="Health" onClick={() => setTabGenre("health")}>
                        <Avatar
                            sx={{ height: "50px", width: "50px" }}
                            src={health}
                            alt="health"
                            className={
                                tab === "health"
                                    ? "news-list__genre-item active"
                                    : "news-list__genre-item"
                            }
                        />
                    </li>
                </Tooltip>
                <Tooltip title="Offbeat">
                    <li className="news-list__genre-Offbeat" key="Offbeat" onClick={() => setTabGenre("offbeat")}>
                        <Avatar
                            sx={{ height: "50px", width: "50px" }}
                            src={offbeat}
                            alt="offbeat"
                            className={
                                tab === "offbeat"
                                    ? "news-list__genre-item active"
                                    : "news-list__genre-item"
                            }
                        />
                    </li>
                </Tooltip>
                <Tooltip title="Sports">
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
                </Tooltip>
            </ul>
            <div>
                {user_genres && user_genres.length ? (
                    <DisplayNewsList
                        user_genres={user_genres}
                        user_positivity={user_positivity}
                        genre={tab}
                        skip={skip}
                        news={news}
                        setNews={setNews}
                        setSkip={setSkip}
                        end={end}
                        setEnd={setEnd} />
                ) : (
                    <p>Fetching the latest news for you...</p>
                )}
            </div>
            <div id="move-to-top">
                <Button
                    onClick={scrollToTop}>
                    <KeyboardArrowUp />
                </Button>
            </div>
        </div>
    );
};

export default withRouter(NewsList);
