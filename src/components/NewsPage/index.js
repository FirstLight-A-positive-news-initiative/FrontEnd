import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";

const NewsPage = () => {
    const { id } = useParams();

    const news = {
        _id: "61657ada41bcb0d8221414f3",
        title: "FDA advisers to vote on Mfd dfd sdfs sdfsdf sdfds fsdf dsfsdfsd sdfsd foderna booster shots",
        link: "https://www.msn.com/en-us/news/us/fda-advisers-to-vote-on-moderna-booster-shots/ar-AAPwemB",
        image_link:
            "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1fJIjk.img?h=1119&w=1119&m=6&q=60&o=f&l=f",
        summary: `An outside panel of the Food and Drug Administration's vaccine experts is scheduled to vote Thursday afternoon on Moderna's request to roll out booster shots of its COVID-19 vaccine for adults vaccinated at least six months ago. The vote will follow a meeting expected to last several hours discussing the safety and the need for an additional dose. 

        Though most studies currently suggest the vaccine remains highly effective at protecting most people against severe COVID-19 infections and death, Moderna and some federal health officials say a third, smaller dose could boost protection in the face of the highly contagious Delta variant and a looming flu season experts warn could be unusually severe for hospitals. 
        
        The FDA and CDC have already authorized Pfizer's third shot for older and higher-risk Americans. More than 7.3 million vaccinated people have received a booster shot of Pfizer's vaccine, according to the Centers for Disease Control and Prevention. Around 1.5 million have received a third dose of Moderna's vaccine, which only some immunocompromised Americans are eligible to receive for now. 
        
        The FDA's Vaccines and Related Biological Products Advisory Committee is also expected to vote Friday on Johnson & Johnson's request to give a second dose to some "high risk" Americans as early as two months after they were first vaccinated with the single-shot vaccine.
        
        "Our goal at the end of that is to hopefully have a harmonized approach to boosters for the three different vaccines, and hopefully try to harmonize — make it a little bit simpler for our recommendation for boosters in the general population," Dr. Peter Marks, the FDA's top vaccines official, said last week at an event hosted by the COVID-19 Vaccine Education and Equity Project.
        
        This week's meetings are just a key first step in the process of allowing booster doses for Moderna and Johnson & Johnson. State and local health officials are planning for the possibility that Moderna and Johnson & Johnson's booster shots could be fully green-lit as early as next week. 
        
        
            `,
        positivity_score: 95,
        date: "2021-10-12T00:00:00.000+00:00",
        genre: "health",
    };

    function trim(str) {
        if (str.length > 50) {
            return str.substr(0, 70) + "...";
        }
        return str;
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return (
        <div className="news-page">
            <div className="news-page__header">
                <img
                    src={news.image_link}
                    className="news-page__header-image"
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
                <a href={news.link}>Read complete article</a>
                <h1 className="news-page__content-title">{news.title}</h1>
                <p>{news.summary}</p>
            </div>
        </div>
    );
};

export default NewsPage;
