import React, { useState } from "react";
import { Alert, Button, Card, CardContent, CardMedia, Grid } from "@mui/material";
import "./styles.css";

import FirstLight from "../../assets/images/FirstLight_No_Text.png";

const ChoosePositivity = () => {
    const [positivity, setPositivity] = useState(null);

    const handleClick = (e) => {
        [20, 40, 70, 90].forEach((rise) => document.querySelector(`#ChoosePositivity__${rise}`).style = "transform: translateY(100%);")
        
        const img_rise = e.target.children[1].id.slice(-2);
        document.querySelector(`#ChoosePositivity__${img_rise}`).style = `animation: rise_${img_rise} 1s ease; animation-fill-mode: forwards;`;
        
        setPositivity(img_rise);
    } 

    const handleSubmit = () => {
        if(!positivity) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            document.getElementById(`ChoosePositivity__alert-box`).className = "ChoosePositivity__alert";
        } else {
            document.getElementById(`ChoosePositivity__alert-box`).className = "ChoosePositivity__alert-disable";
            console.log(positivity);
        }
    } 

    return (
        <div className = "ChoosePositivity">
            <h1 className = "ChoosePositivity__heading">Set a minimum positivity level for your news.</h1>
            <Alert id = "ChoosePositivity__alert-box" severity = "warning" className = "ChoosePositivity__alert-disable">Please set a positivity level before continuing.</Alert>
            <Grid className = "ChoosePositivity__grid" container spacing = {2}>
                <Card className = "ChoosePositivity_card">
                    <CardContent onClick = {(e) => handleClick(e)} className = "ChoosePositivity__card-content">
                    <p>20%</p>
                        <CardMedia 
                            className = "ChoosePositivity__card-img"
                            id = "ChoosePositivity__20"
                            component = "img"
                            image = {FirstLight}
                            alt = "Firstlight"
                        />
                    </CardContent>
                </Card>
                <Card className = "ChoosePositivity_card">
                    <CardContent onClick = {(e) => handleClick(e)} className = "ChoosePositivity__card-content">
                        <p>40%</p>
                        <CardMedia
                            className = "ChoosePositivity__card-img"
                            id = "ChoosePositivity__40"
                            component = "img"
                            image = {FirstLight}
                            alt = "Firstlight"
                        />
                    </CardContent>
                </Card>
                <Card className = "ChoosePositivity_card">
                    <CardContent onClick = {(e) => handleClick(e)} className = "ChoosePositivity__card-content">
                        <p>70%</p>
                        <CardMedia
                            className = "ChoosePositivity__card-img"
                            id = "ChoosePositivity__70"
                            component = "img"
                            image = {FirstLight}
                            alt = "Firstlight"
                        />
                    </CardContent>
                </Card>
                <Card className = "ChoosePositivity_card">
                    <CardContent onClick = {(e) => handleClick(e)} className = "ChoosePositivity__card-content">
                        <p>90%</p>
                        <CardMedia
                            className = "ChoosePositivity__card-img"
                            id = "ChoosePositivity__90"
                            component = "img"
                            image = {FirstLight}
                            alt = "Firstlight"
                        />
                    </CardContent>
                </Card>
            </Grid>
            <div id = "ChoosePositivity__submit-button-div">
                <Button onClick = {handleSubmit} id = "ChoosePositivity__submit-button" variant = "outlined">Save</Button>
            </div>
        </div>
    );
}

export default ChoosePositivity;