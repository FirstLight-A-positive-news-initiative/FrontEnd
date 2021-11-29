import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/FirstLight1.png";
import Img from "../../assets/images/meditating.png";
import { GoogleLogin } from "react-google-login";
import userContext from "../../context/userContext";
import "./styles.css";

const SignUp = ({ history }) => {
    const [signUp, onSignUpChange] = useState(1);
    // eslint-disable-next-line
    const [user, setUser] = useContext(userContext);

    const responseGoogle = async (res) => {
        const googleUser = res.profileObj;
        // check if user already had an account
        axios
            .get(`${process.env.REACT_APP_API}/users/${googleUser.email}`)
            .then((res) => {
                localStorage.setItem(
                    "firstlightUser",
                    JSON.stringify(res.data)
                );
                localStorage.setItem(
                    "avatar", googleUser.imageUrl
                )
                setUser(() => res.data);
            })
            .catch((err) => {
                console.log("err: ", err);
                const firstLightUser = {
                    name: googleUser.givenName + " " + googleUser.familyName,
                    email: googleUser.email,
                };
                localStorage.setItem(
                    "firstlightUser",
                    JSON.stringify(firstLightUser)
                );
                localStorage.setItem(
                    "avatar", googleUser.imageUrl
                )
                setUser(() => firstLightUser);
                history.push("/preferences");
            });
    };

    return (
        <div className="sign-up__bg">
            <div className="sign-up__box">
                {signUp ? (
                    <div>
                        <img
                            className="sign-up__box-logo"
                            alt="Logo"
                            src={Logo}
                        />
                        {/* <h1 className="sign-up__box-title">First Light</h1> */}
                        <p className="sign-up__box-description">
                            First Light is a Positive News Initiative, news from
                            your favourite sources all at one place!
                            <br /> <p className="sign-up__box-join">Join Us Today!!</p>
                        </p>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                        <h3 className="sign-up__box-signin">
                            Already have an account?{" "}
                            <p
                                onClick={() => onSignUpChange(!signUp)}
                                style={{cursor: "pointer"}}
                            >
                                Sign In
                            </p>
                        </h3>
                    </div>
                ) : (
                    <div>
                        <img
                            className="sign-up__box-logo"
                            alt="Logo"
                            src={Logo}
                        />
                        {/* <h1 className="sign-up__box-title">Welcome Back!!</h1> */}
                        <p className="sign-up__box-description">
                            <em>
                                There is no path to happiness, happiness is the
                                path.
                            </em>
                        </p>
                        <p className="sign-up__box-welcome">Welcome Back!!</p>
                        {/* <ThemeProvider theme={theme}> <Button className="sign-up__box-signup" sx={{borderWidth: '2px',}} variant="outlined" color="dark"><FcGoogle size="30"/><h4 className="sign-up__box-signup-register">Login with Google</h4></Button> </ThemeProvider> */}
                        <GoogleLogin
                            className="sign-up__box-google"
                            clientId="#"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />
                        <h3 className="sign-up__box-signin">
                            Don't have an account?{" "}
                            <p
                                onClick={() => onSignUpChange(!signUp)}
                                style={{cursor: "pointer"}}
                            >
                                Sign Up
                            </p>
                        </h3>
                    </div>
                )}
                <img
                    className="sign-up__box-mobileImage"
                    src={Img}
                    alt="meditation"
                />
            </div>
        </div>
    );
};

export default withRouter(SignUp);
