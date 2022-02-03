import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import "./styles.css";
import Placeholder from "../../assets/images/placeholder.svg";
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

    useEffect(() => {
        scroll(0, 0);
    }, [news])

    function trim(str) {
        if (str.length > 60) {
            return str.substr(0, 60) + "...";
        }
        return str;
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return news ? (
        <div id="news-page" className="news-page">
            <Helmet>
                <title>{news.title}</title>
                <meta property="og:site_name" content="FirstLight- A Positive News Initiative" />
                <meta property="og:title" content={news.title} />
                <meta property="og:image" itemprop="image" content={news.image_link} />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="300" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content={news.summary} />
            </Helmet>
            <div className="news-page__header">
                <div className="news-page__header-bg">
                    <div className="news-page__header-bg-image" style={{backgroundImage: `url(${news.image_link.length===0 ? Placeholder : news.image_link})`}}>
                    </div>
                </div>
                <div className="news-page__header-image-wrap">
                    <img
                        src={news.image_link.length===0 ? Placeholder : news.image_link}
                        className="news-page__header-image"
                        alt="news"
                    />
                </div>
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
        <div className="news-page__loading">
        </div>
    );
};

export default NewsPage;
