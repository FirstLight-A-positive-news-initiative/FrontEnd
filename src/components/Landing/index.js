import React, { useEffect } from "react";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Laptop from "./../../assets/images/Laptop.png";
import FL from "./../../assets/images/FirstLight-Radial.png";
import Positive from "./../../assets/images/Features/positive.png";
import Comics from "./../../assets/images/Features/comics.png";
import Download from "./../../assets/images/Features/download.png";
import Games from "./../../assets/images/Features/games.png";
import Sources from "./../../assets/images/Features/sources.png";

import "./styles.css";

const Landing = () => {
  return (
    <div className="landing__cover">
      <div className="landing__wave">
        <div className="landing__title">
          <img className="landing__title-logo" src={FL} />
          <h1 className="landing__title-content-mobile">
            <div>FIRSTLIGHT</div>A Positive Start to your Day
          </h1>
          <h1 className="landing__title-content">
            Start your day with <div>FIRSTLIGHT</div>
          </h1>
          <div>
            <img className="landing__title-image" alt="Laptop" src={Laptop} />
          </div>
        </div>
      </div>
      <div className="landing__feature">
        <h1 className="landing__feature-title">Features</h1>
        <div className="landing__feature-cards">
          <div className="landing__feature-col">
            <div className="landing__feature-card">
              <img src={Positive} />
              <h1>Positive News</h1>
              <h2>Choose how positive the news should be for you.</h2>
            </div>
            <div className="landing__feature-card">
              <img src={Download} />
              <h1>Download application</h1>
              <h2>Download it on your phone or desktop with PWA support.</h2>
            </div>
          </div>
          <div className="landing__feature-col">
            <div className="landing__feature-card">
              <img src={Sources} />
              <h1>Multiple News Sources</h1>
              <h2>
                Enjoy news from your favorite news sources such as CNN, BCC,
                NDTV, and Tech Crunch
              </h2>
            </div>
            <div className="landing__feature-card">
              <img src={Games} />
              <h1>Play Games</h1>
              <h2>
                Play the traditional newspaper games such as Tic Tac Toe,
                Sudoku, and Maze or solve them using AI.
              </h2>
            </div>
            <div className="landing__feature-card">
              <img src={Comics} />
              <h1>Read Comics</h1>
              <h2>
                Read your favorite comics such as Dilbert, Garfield, Calvin and
                Hobbes and many more...
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="landing__about">
        <p className="landing__about-title">Developers behind the Scene</p>
        <div className="landing__about-cards">
          <div className="landing__about-card">
            <img
              className="landing__about-card-img"
              src="https://github.com/arjun-kathail.png?size=460"
            />
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">Arjun Kathail</div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <a href="mailto:arjunkathail5@gmail.com">
                    <MailIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a
                    href="https://www.linkedin.com/in/arjun-kathail/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a href="https://github.com/arjun-kathail" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="landing__about-card">
            <img
              className="landing__about-card-img"
              src="https://github.com/utkarshgoelut.png?size=460"
            />
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">Utkarsh Goel</div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <a href="mailto:ugoel911@gmail.com">
                    <MailIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a
                    href="https://www.linkedin.com/in/utkarshgoelut/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a href="https://github.com/UtkarshGoelUT" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="landing__about-card">
            <img
              className="landing__about-card-img"
              src="https://github.com/solarconstant.png?size=460"
            />
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">Shubh Ashish</div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <a href="mailto:ashishshubh001@gmail.com">
                    <MailIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a
                    href="https://www.linkedin.com/in/shubh-ashish-a4a415190/"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a href="https://github.com/solarconstant" target="_blank">
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
