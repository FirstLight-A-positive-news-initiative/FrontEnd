import React from "react";
import "./styles.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__main">
                <div className="footer__main-about">
                    <h1>About us</h1>
                    <p>
                        FirstLight is an application that aims to provide people
                        with positive news to make their day better. FirstLight
                        ensures its users always receive news that carries a
                        positive tone. This is an effort to ensure a healthy and
                        productive mind which in turn leads to a person’s
                        holistic growth.
                    </p>
                </div>
                <div className="footer__main-links">
                    <h1>Quick Links</h1>
                    <ul>
                        <li>
                            <a href="https://github.com/FirstLight-A-positive-news-initiative/FrontEnd.git">
                                Frontend Repo
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/FirstLight-A-positive-news-initiative/Backend.git">
                                Backend Repo
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/FirstLight-A-positive-news-initiative/Scraper.git">
                                Scraper Repo
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/FirstLight-A-positive-news-initiative/SoftwareEngineering.git">
                                Software Repo
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                Copyright © 2021 FirstLight, All rights are reserved.
            </div>
        </div>
    );
};

export default Footer;
