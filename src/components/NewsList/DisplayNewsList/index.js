import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import Card from "../../Card/index";
import "./styles.css";

const DisplayNewsList = (props) => {
    const [newss, setNews] = useState([12, 24, 4, 1, 4, 5]);
    return newss ? (
        <div className="diplay-news__list">
            {newss.map((news) => (
                <Card news={news} />
            ))}
        </div>
    ) : (
        <div className="diplay-news__skeleton-container">
            <div className="display-news__skeleton-box">
                <Skeleton variant="rectangular" width="90%" height="500%" />
                <Skeleton width="90%" />
                <Skeleton width="60%" />
            </div>
            <div className="display-news__skeleton-box">
                <Skeleton variant="rectangular" width="90%" height="500%" />
                <Skeleton width="90%" />
                <Skeleton width="60%" />
            </div>
            <div className="display-news__skeleton-box">
                <Skeleton variant="rectangular" width="90%" height="500%" />
                <Skeleton width="90%" />
                <Skeleton width="60%" />
            </div>
        </div>
    );
};

export default DisplayNewsList;
