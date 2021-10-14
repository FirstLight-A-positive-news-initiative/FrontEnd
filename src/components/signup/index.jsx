import React, {useState} from "react";
import {Button} from '@mui/material';
import {FcGoogle} from "react-icons/fc";
import Logo from "../../assets/images/FirstLight1.png";
import Img from "../../assets/images/meditating.png"
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

    const [signUp, onSignUpChange] = useState(1);

    return <div className="bg">
        <div className="box">
            {signUp?<div>
                <img className="logo" alt="Logo" src={Logo}/>
                {/* <h1 className="title">First Light</h1> */}
                <p className="description">First Light is a Positive News Initiative, news from your favourite sources all at one place!<br/> Join Us Today!!</p>
                <ThemeProvider theme={theme}> <Button className="signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="register">Register with Google</h4></Button> </ThemeProvider>
                <h3 className="signin">Already have an account? <a href="javascript:void(0);" onClick={()=> onSignUpChange(!signUp)}>Sign In</a></h3>
            </div>
            :<div>
                <img className="logo" alt="Logo" src={Logo}/>
                {/* <h1 className="title">Welcome Back!!</h1> */}
                <p className="description"><em>There is no path to happiness, happiness is the path.</em></p> 
                <p className="welcome">Welcome Back!!</p>
                <ThemeProvider theme={theme}> <Button className="signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="register">Login with Google</h4></Button> </ThemeProvider>
                <h3 className="signin">Don't have an account? <a href="javascript:void(0);" onClick={()=> onSignUpChange(!signUp)}>Sign Up</a></h3>
            </div>
            }
            <img className="mobileImage" src={Img} alt="meditation"/>
        </div>
    </div>;
}

export default SignUp;