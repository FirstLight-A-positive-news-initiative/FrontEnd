import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewsPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    const fetchNews = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/news/${id}`
            );
            setNews(() => res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [id]);

    function trim(str) {
        if (str.length > 100) {
            return str.substr(0, 100) + "...";
        }
        return str;
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return news ? (
        <div className="news-page">
            <div className="news-page__header">
                <div className="news-page__header-bg">
                    <div className="news-page__header-bg-image" style={{backgroundImage: `url(${news.image_link})`}}>
                    </div>
                </div>
                <img
                    src={news.image_link}
                    className="news-page__header-image"
                    alt="news"
                />
                <div className="news-page__overlay">
                    <p className="news-page__header-genre">
                        {toTitleCase(news.genre)}
                    </p>
                    <h1 className="news-page__header-title">
                        {trim(news.title)}
                    </h1>
                </div>
            </div>
            <div className="news-page__content">
                <a href={news.link} target="_blank" rel="noopener noreferrer">Read complete article</a>
                <h1 className="news-page__content-title">{news.title}</h1>
                <p>{news.summary}</p>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default NewsPage;