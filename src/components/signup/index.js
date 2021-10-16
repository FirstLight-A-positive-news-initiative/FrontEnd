import React, {useState} from "react";
// import {Button} from '@mui/material';
// import {FcGoogle} from "react-icons/fc";
import Logo from "../../assets/images/FirstLight1.png";
import Img from "../../assets/images/meditating.png"
import { createTheme } from '@mui/material/styles';
// import { ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
import "./styles.css";

const theme = createTheme({
  palette: {
    dark: {
      main: '#4d4d4d',
      contrastText: '#fff',
    },
  },
});

const responseGoogle = (response) => {
  console.log(response);
}

const SignUp=()=>{

    const [signUp, onSignUpChange] = useState(1);

    return <div className="sign-up__bg">
        <div className="sign-up__box">
            {signUp?<div>
                <img className="sign-up__box-logo" alt="Logo" src={Logo}/>
                {/* <h1 className="sign-up__box-title">First Light</h1> */}
                <p className="sign-up__box-description">First Light is a Positive News Initiative, news from your favourite sources all at one place!<br/> Join Us Today!!</p>
                {/* <ThemeProvider theme={theme}> <Button className="sign-up__box-signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="sign-up__box-signup-register">Register with Google</h4></Button> </ThemeProvider> */}
                <GoogleLogin
                  className="sign-up__box-google"
                  clientId="#"
                  buttonText="Register with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <h3 className="sign-up__box-signin">Already have an account? <a href="javascript:void(0);" onClick={()=> onSignUpChange(!signUp)}>Sign In</a></h3>
            </div>
            :<div>
                <img className="sign-up__box-logo" alt="Logo" src={Logo}/>
                {/* <h1 className="sign-up__box-title">Welcome Back!!</h1> */}
                <p className="sign-up__box-description"><em>There is no path to happiness, happiness is the path.</em></p> 
                <p className="sign-up__box-welcome">Welcome Back!!</p>
                {/* <ThemeProvider theme={theme}> <Button className="sign-up__box-signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="sign-up__box-signup-register">Login with Google</h4></Button> </ThemeProvider> */}
                <GoogleLogin
                  className="sign-up__box-google"
                  clientId="#"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                <h3 className="sign-up__box-signin">Don't have an account? <a href="javascript:void(0);" onClick={()=> onSignUpChange(!signUp)}>Sign Up</a></h3>
            </div>
            }
            <img className="sign-up__box-mobileImage" src={Img} alt="meditation"/>
        </div>
    </div>;
}

export default SignUp;