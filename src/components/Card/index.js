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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
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
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png"
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
