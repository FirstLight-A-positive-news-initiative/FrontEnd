import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";
import SignUp from "./components/signup";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import ChooseGenre from "./components/ChooseGenre";
import NewsPage from "./components/NewsPage";

const App = () => {
    var routes = null;
    // const [user, setUser] = useContext(userContext);
    var user = null;
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
                    <Route exact path="/:id" component={NewsPage} />
                    <Redirect to="/news"></Redirect>
                </Switch>
                <BottomNav />
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
