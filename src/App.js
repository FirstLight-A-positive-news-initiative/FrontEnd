import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";
import SignUp from "./components/signup";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import ChooseGenre from "./components/ChooseGenre";
import ChoosePositivity from "./components/ChoosePositivity";
import NewsPage from "./components/NewsPage";

const App = () => {
    var routes = null;
    // const [user, setUser] = useContext(userContext);
    var user = "shubh";
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
                    <Route exact path="/choose-genre" component={ChooseGenre} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    <Route exact path = "/choose-positivity" component = {ChoosePositivity} />
                    <Redirect to="/news"></Redirect>
                </Switch>
                <BottomNav />
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
