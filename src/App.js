import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";
import SignUp from "./components/signup";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Preferences from "./components/Preferences";
import NewsPage from "./components/NewsPage";
import Card from "./components/Card";
import NewsList from "./components/NewsList";
import ComicsPage from "./components/ComicsPage";
import TicTacToe from "./components/Games/TicTacToe";
import Footer from "./components/Footer";

const App = () => {
    var routes = null;
    const [user, setUser] = useContext(userContext);
    if (user == null) {
        routes = (
            <div>
                <Switch>
                    <Route path="/login" component={SignUp} />
                    <Redirect to="/login"></Redirect>
                </Switch>
                <Footer />
            </div>
        );
    } else {
        routes = (
            <div>
                <TopNav />
                <Switch>
                    <Route exact path="/news" component={NewsList} />
                    <Route exact path="/preferences" component={Preferences} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    <Route exact path="/test/card" component={Card} />
                    <Route exact path="/games/tic-tac-toe" component = {TicTacToe} />
                    <Route exact path="/comics" component={ComicsPage} />
                    <Redirect to="/news"></Redirect>
                </Switch>
                <Footer />
                <BottomNav />
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
