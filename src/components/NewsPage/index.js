import React, { useState, useEffect } from "react";
import "./styles.css";
import Placeholder from "../../assets/images/placeholder.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import FourZeroFour from "../404";

const NewsPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/news/${id}`);
      setNews(() => res.data);
      setNotFound(() => false);
    } catch (e) {
      setNotFound(() => true);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [news]);

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

  const websource = (str) => {
    if (str.includes("techcrunch")) {
        return "TechCrunch";
    } else if (str.includes("bbc")) {
        return "BBC";
    } else if (str.includes("cnn")) {
        return "CNN";
    } else if (str.includes("ndtv")) {
        return "NDTV";
    } else if(str.includes("india.com")) {
        return "IndiaTV";
    } else {
        return "FirstLight";
    }
  };

  return news ? (
    <div id="news-page" className="news-page">
      <div className="news-page__header">
        <div className="news-page__header-bg">
          <div
            className="news-page__header-bg-image"
            style={{
              backgroundImage: `url(${
                news.image_link.length === 0 ? Placeholder : news.image_link
              })`,
            }}
          ></div>
        </div>
        <div className="news-page__header-image-wrap">
          <img
            src={news.image_link.length === 0 ? Placeholder : news.image_link}
            className="news-page__header-image"
            alt="news"
          />
        </div>
        <div className="news-page__overlay">
          <p className="news-page__header-genre">{toTitleCase(news.genre)}</p>
          <h1 className="news-page__header-title">{trim(news.title)}</h1>
        </div>
      </div>
      <div className="news-page__content">
        <a href={news.link} target="_blank" rel="noopener noreferrer">
          Read complete article
        </a>
        <h1 className="news-page__content-title">{news.title}</h1>
        <p>{news.summary}</p>
        <p id="news-page__content-source">Source: {websource(news.link)}</p>
      </div>
    </div>
  ) : notFound ? (
        <FourZeroFour />
  ) : (
    <div className="news-page__loading"></div>
  );
};

export default NewsPage;
