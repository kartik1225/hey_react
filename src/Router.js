import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import NavBar from "./NavBar";
import AboutUs from "./AboutUs";
import App from "./App"

export default () => {
    return <Router>
        <NavBar/>
        <Switch>
            <Route exact path="/">
                <App/>
            </Route>
            <Route path="/about">
                <AboutUs/>
            </Route>
        </Switch>
    </Router>
}