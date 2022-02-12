import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";
import Landing from "./components/Landing"
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Preferences from "./components/Preferences";
import NewsPage from "./components/NewsPage";
import Card from "./components/Card";
import NewsList from "./components/NewsList";
import ComicsPage from "./components/ComicsPage";
import TicTacToe from "./components/Games/TicTacToe";
import MazeSolver from "./components/Games/MazeSolver";
import Footer from "./components/Footer";
import Sudoku from "./components/Games/Sudoku";
import SingleComic from "./components/ComicsPage/SingleComicPage";
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
    var routes = null;
    const [ user ] = useContext(userContext);

    if (user == null) {
        routes = (
            <div>
                <TopNav />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/comics/:id" component={SingleComic} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    <Redirect to="/"></Redirect>
                </Switch>
                <Footer />
                <BottomNav />
            </div>
        );
    } else if(!(("genre" in user) || ("positivity" in user))){
        routes = (
            <div>
                <Switch>
                    <Route exact path="/preferences" component={Preferences} />
                    <Redirect to="/preferences"></Redirect>
                </Switch>
                <Footer />
            </div>
        );
    } else {
        routes = (
            <div>
                <TopNav />
                <Switch>
                    <Route exact path="/featured" component={NewsList} />
                    <Route exact path="/world" component={NewsList} />
                    <Route exact path="/india" component={NewsList} />
                    <Route exact path="/entertainment" component={NewsList} />
                    <Route exact path="/politics" component={NewsList} />
                    <Route exact path="/science" component={NewsList} />
                    <Route exact path="/technology" component={NewsList} />
                    <Route exact path="/business" component={NewsList} />
                    <Route exact path="/health" component={NewsList} />
                    <Route exact path="/offbeat" component={NewsList} />
                    <Route exact path="/sports" component={NewsList} />
                    <Route exact path="/preferences" component={Preferences} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    <Route exact path="/test/card" component={Card} />
                    <Route
                        exact
                        path="/games/tic-tac-toe"
                        component={TicTacToe}
                    />
                    <Route
                        exact
                        path="/games/maze-solver"
                        component={MazeSolver}
                    />
                    <Route exact path="/games/sudoku" component={Sudoku} />
                    <Route exact path="/comics" component={ComicsPage} />
                    <Route exact path="/comics/:id" component={SingleComic} />
                    <Redirect to="/featured"></Redirect>
                </Switch>
                <Footer />
                <BottomNav />
            </div>
        );
    }
    return <HelmetProvider><div className="App">{routes}</div></HelmetProvider>;
};

export default App;
