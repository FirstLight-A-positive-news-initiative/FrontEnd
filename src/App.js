import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";
import userContext from "./context/userContext";

const App = () => {
    var routes = null;
    const [user, setUser] = useContext(userContext);
    if (user == null) {
        routes = (
            <Switch>
                <Redirect></Redirect>
            </Switch>
        );
    } else {
        routes = (
            <div>
                <Switch>
                    <Redirect></Redirect>
                </Switch>
            </div>
        );
    }
    return <div className="App">{routes}</div>;
};

export default App;
