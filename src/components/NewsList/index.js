import React, { useState } from "react";
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
    const [tab, setTab] = useState("featured");
    return (
        <div className="news-list__container">
            <ul className="news-list__genre">
                <li onClick={() => setTab(() => "featured")}>
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
                <li onClick={() => setTab(() => "entertainment")}>
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
                <li onClick={() => setTab(() => "politics")}>
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
                <li onClick={() => setTab(() => "science")}>
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
                <li onClick={() => setTab(() => "technology")}>
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
                <li onClick={() => setTab(() => "sports")}>
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
                <DisplayNewsList genre={tab} />
            </div>
        </div>
    );
};

export default NewsList;
