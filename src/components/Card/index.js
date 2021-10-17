import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import "./styles.css";

export default function NewsCard() {

  const news = {
    _id: "61657ada41bcb0d8221414f3",
    title: "Researchers show Facebook’s ad tools can target a single user. Researchers show Facebook’s ad tools can target a single user. Researchers show Facebook’s ad tools can target a single user. Researchers show Facebook’s ad tools can target a single user.",
    link: "https://techcrunch.com/2021/10/15/researchers-show-facebooks-ad-tools-can-target-a-single-user/",
    image_link: "https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1228003986.jpg?w=850&h=492&crop=1",
    summary: `An outside panel of the Food and Drug Administration's vaccine experts is scheduled to vote Thursday afternoon on Moderna's request to roll out booster shots of its COVID-19 vaccine for adults vaccinated at least six months ago. The vote will follow a meeting expected to last several hours discussing the safety and the need for an additional dose. 

    Though most studies currently suggest the vaccine remains highly effective at protecting most people against severe COVID-19 infections and death, Moderna and some federal health officials say a third, smaller dose could boost protection in the face of the highly contagious Delta variant and a looming flu season experts warn could be unusually severe for hospitals. 
    
    The FDA and CDC have already authorized Pfizer's third shot for older and higher-risk Americans. More than 7.3 million vaccinated people have received a booster shot of Pfizer's vaccine, according to the Centers for Disease Control and Prevention. Around 1.5 million have received a third dose of Moderna's vaccine, which only some immunocompromised Americans are eligible to receive for now. 
    
    The FDA's Vaccines and Related Biological Products Advisory Committee is also expected to vote Friday on Johnson & Johnson's request to give a second dose to some "high risk" Americans as early as two months after they were first vaccinated with the single-shot vaccine.
    
    "Our goal at the end of that is to hopefully have a harmonized approach to boosters for the three different vaccines, and hopefully try to harmonize — make it a little bit simpler for our recommendation for boosters in the general population," Dr. Peter Marks, the FDA's top vaccines official, said last week at an event hosted by the COVID-19 Vaccine Education and Equity Project.
    
    This week's meetings are just a key first step in the process of allowing booster doses for Moderna and Johnson & Johnson. State and local health officials are planning for the possibility that Moderna and Johnson & Johnson's booster shots could be fully green-lit as early as next week. 
    
    
        `,
    positivity_score: 95,
    date: "2021-10-12T00:00:00.000+00:00",
    genre: "technology",
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const trimTitle=(str)=>{
    if(str.length > 100){
      return str.substr(0, 100) + "...";
    }
    else
    return str;
  }

  return (
  <div className="newsCard">
    <Card sx={{borderRadius: "1.5rem", margin:"4%" , width: 345, height: 430, display: "inline-block"}}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ height: "30px", width: "30px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png" alt="source" />
          } 
          title={
            <p className="card__genre">
              {toTitleCase(news.genre)}
            </p>
          }
        />
        <CardMedia
          sx={{width: "320px", borderRadius: "1rem", margin: "auto",}}
          component="img"
          height="194"
          image={news.image_link}
          alt="News Image"
        />
        <CardContent>
          <Typography sx={{height:"85px" , lineHeight: 1.3, fontSize:"1.18rem", fontWeight:"700", color:"#4d4d4d"}}>
          {trimTitle(news.title)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "left", paddingTop: 0, paddingBottom: "10px", }} disableSpacing>
        <IconButton aria-label="save">
          <BookmarkIcon sx={{fontSize:"2rem", color: 'black'}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{fontSize:"2rem", color: 'black'}}/>
        </IconButton>
      </CardActions>
    </Card>
  </div>
  );
}
