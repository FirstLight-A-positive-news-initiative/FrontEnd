import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import TC from "../../assets/images/NewsLogos/techcrunch.png";
import BBC from "../../assets/images/NewsLogos/bbc.png";
import CNN from "../../assets/images/NewsLogos/cnn.jpg";
import NDTV from "../../assets/images/NewsLogos/ndtv.png";
import FL from "../../assets/images/FirstLight-Radial.png";
import IN from "../../assets/images/NewsLogos/indiadotcom.png";
import Placeholder from "../../assets/images/placeholder.svg";
import "./styles.css";

export default function NewsCard({ news, modalLink, setModalLink, setModalTitle }) {
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const trimTitle = (str) => {
        if (str.length > 100) {
            return str.substr(0, 100) + "...";
        } else return str;
    };

    const linklogo = (str) => {
        if (str.includes("techcrunch")) {
            return TC;
        } else if (str.includes("bbc")) {
            return BBC;
        } else if (str.includes("cnn")) {
            return CNN;
        } else if (str.includes("ndtv")) {
            return NDTV;
        } else if(str.includes("india.com")) {
            return IN;
        } else {
            return FL;
        }
    };

    const date = (str)=>{
        var date=new Date(str.substr(0, str.length-5));
        var today=new Date();
        var diff =(today.getTime()-date.getTime())/1000;
        diff/=(60*60);
        var hours=Math.abs(Math.round(diff));
        var days=Math.floor(hours/24);
        if(days>0){
            if(days===1)
                return "1 day ago";
            else return days + " days ago";
        }
        else if(hours){
            if(hours===1)
                return "1 hour ago";
            else return hours + " hours ago";
        }
        else return "Recent";
    }

    return (
        <div className="newsCard">
            <Card
                sx={{
                    borderRadius: "1.5rem",
                    margin: "4%",
                    width: 345,
                    height: 430,
                    display: "inline-block",
                    boxShadow: "2px 2px 8px gray"
                }}
            >
                <Link to={`/news/${news._id}`} className="news-list__link">
                    <CardActionArea>
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ height: "30px", width: "30px" }}
                                    src={linklogo(news.link)}
                                    alt="source"
                                />
                            }
                            title={
                                <p className="card__genre">
                                    {toTitleCase(news.genre)}
                                </p>
                            }
                        />
                        <CardMedia
                            sx={{
                                width: "320px",
                                borderRadius: "1rem",
                                margin: "auto",
                            }}
                            component="img"
                            height="194"
                            src={news.image_link.length===0 ? Placeholder : news.image_link}
                            alt="News Image"
                        />
                        <CardContent>
                            <Typography
                                sx={{
                                    height: "85px",
                                    lineHeight: 1.3,
                                    fontSize: "1.18rem",
                                    fontWeight: "700",
                                    color: "#4d4d4d",
                                }}
                            >
                                {trimTitle(news.title)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: 0,
                        paddingBottom: "10px",
                    }}
                    disableSpacing
                >
                    {/* <IconButton aria-label="save">
                        <BookmarkIcon
                            sx={{ fontSize: "2rem", color: "black" }}
                        />
                    </IconButton> */}
                    <Button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: `${news.title}`,
                                    url: `/news/${news._id}`,
                                    text: `Hey! Check out this news on FirstLight - A Positive News Initiative!\n\n${news.title}`,
                                });
                            } else {
                                setModalLink(() => news._id);
                                setModalTitle(() => news.title);
                            }
                        }}
                    >
                        <ShareIcon sx={{ fontSize: "2rem", color: "black" }} />
                    </Button>
                    <span className="card__date">{date(news.date)}</span>
                </CardActions>
            </Card>
        </div>
    );
}
