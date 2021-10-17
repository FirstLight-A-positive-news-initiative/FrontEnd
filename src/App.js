import React from "react";
import { Switch, Route, Redirect } from "react-router";
// import userContext from "./context/userContext";
import SignUp from "./components/signup";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Preferences from "./components/Preferences";
import NewsPage from "./components/NewsPage";
import Card from "./components/Card";

const App = () => {
    var routes = null;
    // const [user, setUser] = useContext(userContext);
    var user = "null";
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
                    <Route exact path="/preferences" component = {Preferences} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    {/* <Route exact path="/test/card" component={Card} /> */}
                    <Redirect to="/news/test"></Redirect>
                </Switch>
                <BottomNav />
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
