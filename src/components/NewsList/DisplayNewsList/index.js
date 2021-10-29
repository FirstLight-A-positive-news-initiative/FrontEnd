import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Card, CardHeader, CardMedia, CardContent, Skeleton } from "@mui/material";
import NewsCard from "../../Card/index";
import "./styles.css";

const DisplayNewsList = ({ user_genres, user_positivity, genre, skip }) => {
    const [news, setNews] = useState([]);

    // get news for a specific genre tab
    useEffect(() => {
        const fetchAllNews = async () => {
            let genres = "";
            user_genres.split(",").map((genre) => {
                genres += genre.toLowerCase();
                genres += ","
            })
            if(genre == "featured") {
                const res = await axios.get(`${process.env.REACT_APP_API}/news/list/${genres}/${user_positivity}/${skip}`);
                setNews(() => res.data);
            } else {
                const res = await axios.get(`${process.env.REACT_APP_API}/news/list/${genre}/${user_positivity}/${skip}`);
                setNews(() => res.data);
            }
        }

        fetchAllNews();
    }, [genre])

    // get news for feaured tab

    return news && news.length ? (
        <div className="display-news__list">
            {news.map((news) => (
                <NewsCard news={news} />
            ))}
        </div>
    ) : (
        <div className="display-news__list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((skeleton) => (
                <Card sx={{ borderRadius: "1.5rem", margin: "4%", width: 345, height: 430, display: "inline-block" }}>
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
