import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card, CardHeader, CardMedia, CardContent, Skeleton } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";
import NewsCard from "../../Card/index";
import "./styles.css";
import Logo from "../../../assets/images/FirstLight_No_Text.png";

const DisplayNewsList = ({ user_genres, user_positivity, news, setNews, genre, skip, setSkip, end, setEnd }) => {
    // infinite scroll intersection observer
    const [element, setElement] = useState(null);
    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];

                if (first.isIntersecting) {
                    setSkip((prev) => prev + 10);
                }
            },
            {
                threshold: 1
            }
        )
    );

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [element])

    const fetchAllNews = async () => {
        let genres = "";
        user_genres.split(",").forEach((genre) => {
            genres += genre.toLowerCase();
            genres += ","
        })
        if (genre === "featured") {
            const res = await axios.get(`${process.env.REACT_APP_API}/news/list/${genres}/${user_positivity}/${skip}`);
            if(res.data.length === 0) {
                setEnd(true);
            }
            setNews([...news, ...res.data]);
        } else {
            const res = await axios.get(`${process.env.REACT_APP_API}/news/list/${genre}/${user_positivity}/${skip}`);
            if(res.data.length === 0) {
                setEnd(true);
            }
            setNews([...news, ...res.data]);
        }
    }

    useEffect(() => {
        if(user_genres && user_positivity) {
            fetchAllNews();
        }
    }, [user_genres, genre, skip])

    return news && news.length ? (
        <>
            <div className="display-news__list">
                {news.map((news) => (
                    <NewsCard key = {`${news.genre}-${news.title}`} news={news} />
                ))}
            </div>
            <div ref={setElement} className="display-news__load-more">
                {(news.length || skip === 0) && (!end) ? (
                    <p>
                        Loading News...
                        <img src={Logo} id = "display-news__logo-loader" alt="Logo-loader" />
                    </p>
                ) : (
                    <p>
                        You're all caught up
                    <CheckRounded id = "display-news__check" />
                </p>
                )}
            </div>
        </>
    ) : (
        <div className="display-news__skeleton-container">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((skeleton) => (
                <Card key = {skeleton} className = "display-news__skeleton-box">
                    <CardHeader
                        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                        title={<Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />}
                    />
                    <CardMedia>
                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                    </CardMedia>
                    <CardContent>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DisplayNewsList;
