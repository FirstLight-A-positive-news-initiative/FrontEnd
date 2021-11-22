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
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import TC from "../../assets/images/NewsLogos/techcrunch.png";
import BBC from "../../assets/images/NewsLogos/bbc.png";
import CNN from "../../assets/images/NewsLogos/cnn.jpg";
import NDTV from "../../assets/images/NewsLogos/ndtv.png";
import FL from "../../assets/images/FirstLight_No_Text.png";
import "./styles.css";

export default function NewsCard({ news, modalLink, setModalLink }) {

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

    const linklogo = (str)=>{
        if(str.includes('techcrunch')){
            return TC;
        } else if(str.includes('bbc')){
            return BBC;
        } else if(str.includes('cnn')){
            return CNN;
        } else if(str.includes('ndtv')){
            return NDTV;
        } else{
            return FL;
        }
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
                            image={news.image_link}
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
                        justifyContent: "left",
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
                                    url: `Hey! Check out this news on Firstlight. Firstlight is the best news app ever!\n\nhttp://localhost:3000/news/${news._id}`,
                                });
                            } else {
                                setModalLink(() => news._id);
                            }
                        }}
                    >
                        <IconButton aria-label="share">
                            <ShareIcon
                                sx={{ fontSize: "2rem", color: "black" }}
                            />
                        </IconButton>
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
