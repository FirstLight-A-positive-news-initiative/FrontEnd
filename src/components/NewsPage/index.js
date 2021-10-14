import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";

const NewsPage = () => {
    const { id } = useParams();

    const news = {
        _id: "61657ada41bcb0d8221414f3",
        title: "Reusable masks just as safe & effective after washing, drying: Study -...",
        link: "https://www.timesnownews.com/health/article/reusable-masks-just-as-saf...",
        image_link:
            "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_T...",
        summary:
            "The study also confirms previous research that layering a cotton mask ...",
        positivity_score: 95,
        date: "2021-10-12T00:00:00.000+00:00",
        genre: "technology",
    };

    console.log(id);

    return (
        <div>
            <div
                className="news-page__header"
                styles={{ backgroundImage: `url(${news.image_link})` }}
            >
                <h1>{news.title}</h1>
            </div>
            <div className="news-page__content">
                <p>{news.summary}</p>
            </div>
        </div>
    );
};

export default NewsPage;
