import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";
import SignUp from "./components/signup";
import TopNav from "./components/TopNav";
import ChooseGenre from "./components/ChooseGenre";

const App = () => {
    var routes = null;
    // const [user, setUser] = useContext(userContext);
    const user = "shubh"
    if (user == null) {
        routes = (
            <div>
                <Switch>
                    <Route path="/login" component={SignUp} />
                    <Redirect to="/"></Redirect>
                </Switch>
            </div>
        );
    } else {
        routes = (
            <div>
                <TopNav />
                <Switch>
                    <Route exact path = "/choose-genre" component = {ChooseGenre} />
                    <Redirect to="/news"></Redirect>
                </Switch>
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
