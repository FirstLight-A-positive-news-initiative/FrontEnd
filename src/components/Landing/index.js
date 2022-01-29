import React, { useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Laptop from "./../../assets/images/Laptop.png";
import Arjun from "./../../assets/images/Team/Arjun.png";
import Shubh from "./../../assets/images/Team/Shubh.jpg";
import Utkarsh from "./../../assets/images/Team/Utkarsh.jpeg";
import './styles.css';

const Landing = ()=>{

  return (
    <div className="landing__cover">
      <div className="landing__wave">
        <div className="landing__title">
          <h1 className="landing__title-content">Start your day with <div>FIRSTLIGHT</div></h1>
          <div><img className="landing__title-image" alt="Laptop" src={Laptop}/></div>
        </div>
      </div>
      <div className="landing__about">
        <p className="landing__about-title">Developers behind the Scene</p>
        <div className="landing__about-cards">
          <div className="landing__about-card">
            <img className="landing__about-card-img"  src="https://avatars.githubusercontent.com/u/65658829?s=460&v=4"/>
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">
                Arjun Kathail
              </div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <a href="mailto:arjunkathail5@gmail.com"><MailIcon/></a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a href="https://www.linkedin.com/in/arjun-kathail/" target="_blank"><LinkedInIcon/></a>
                </div>
                <div className="landing__about-card-contact-icon">
                  <a href="https://github.com/arjun-kathail" target="_blank"><GitHubIcon/></a>
                </div>
              </div>
            </div>
          </div>
          <div className="landing__about-card">
            <img className="landing__about-card-img"  src="https://avatars.githubusercontent.com/u/52048551?s=460&v=4"/>
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">
                Utkarsh Goel
              </div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <MailIcon/>
                </div>
                <div className="landing__about-card-contact-icon">
                  <LinkedInIcon/>
                </div>
                <div className="landing__about-card-contact-icon">
                  <GitHubIcon/>
                </div>
              </div>
            </div>
          </div>
          <div className="landing__about-card">
            <img className="landing__about-card-img"  src={Shubh}/>
            <div className="landing__about-card-animate">
              <span className="landing__about-card-animate-line-1"></span>
              <span className="landing__about-card-animate-line-2"></span>
              <span className="landing__about-card-animate-line-3"></span>
              <span className="landing__about-card-animate-line-4"></span>
              <div className="landing__about-card-title">
                Shubh Ashish
              </div>
              <div className="landing__about-card-contact">
                <div className="landing__about-card-contact-icon">
                  <MailIcon/>
                </div>
                <div className="landing__about-card-contact-icon">
                  <LinkedInIcon/>
                </div>
                <div className="landing__about-card-contact-icon">
                  <GitHubIcon/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;