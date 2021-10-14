import React, {useState} from "react";
import {Button} from '@mui/material';
import {FcGoogle} from "react-icons/fc";
import Logo from "../../assets/images/FirstLight1.png";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import "./styles.css";

const theme = createTheme({
    palette: {
      dark: {
        main: '#4d4d4d',
        contrastText: '#fff',
      },
    },
  });

const SignUp=()=>{
    return <div className="bg">
        <div className="box">
            <div>
                <img className="logo" src={Logo}/>
                {/* <h1 className="title">First Light</h1> */}
                <p className="description">First Light is a Positive News Initiative, news from your favourite sources all at one place! Join Us Today!!</p>
                <ThemeProvider theme={theme}> <Button className="signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="register">Register with Google</h4></Button> </ThemeProvider>
                <h3 className="signin">Already have an account? <a href="http://www.google.com">Sign In</a></h3>
            </div>
        </div>
    </div>;
}

export default SignUp;