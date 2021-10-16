import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import "./styles.css";

export default function NewsCard() {

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  return (
  <div className="newsCard">
    <Card sx={{borderRadius: "1.5rem", margin:"4%" , width: 345, height: 450, display: "inline-block", margin: "0px",}}>
      <CardHeader
        avatar={
          <Avatar sx={{ height: "30px", width: "30px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png" alt="source" />
        } 
        title={
          <p className="card__genre">
            {toTitleCase("technology")}
          </p>
        }
      />
      <CardMedia
        sx={{width: "320px", borderRadius: "1rem", margin: "auto",}}
        component="img"
        height="194"
        image="https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1228003986.jpg?w=850&h=492&crop=1"
        alt="Paella dish"
      />
      <CardContent>
        <Typography sx={{height:"95px" , lineHeight: 1.3, fontSize:"1.18rem", fontWeight:"700", color:"#4d4d4d"}}>
        Researchers show Facebook’s ad tools can target a single user. Researchers show Facebook’s ad tools can target a single user.
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "left", paddingTop: 0, paddingBottom: 0, }} disableSpacing>
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
