import React, {useState} from "react";
import {Button} from '@mui/material';
import {FcGoogle} from "react-icons/fc"
import "./styles.css"

const SignUp=()=>{
    return <div className="box">
        <div>
            <h1 className="title">First Light</h1>
            <p className="description">First Light is a Positive News Initiative, news from your favourite sources all at one place! Join Us Today!!</p>
            <Button className="signup" variant="outlined" color="error"><FcGoogle size="30"/><h4 className="register">Register with Google</h4></Button>
            <h3 className="signin">Already have an account? <a href="http://www.google.com">Sign In</a></h3>
        </div>
    </div>;
}

export default SignUp;