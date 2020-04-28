import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Social from "./Social";
import UsersDashBoard from "./Users/UsersDashBoard";

class Main extends Component {
  // routing right there
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/social">
            <Social />
          </Route>
          <Route exact path="/api/weather" component={Home}></Route>
          <Route exact path="/users/login">
            <Social />
          </Route>
          <Route exact path="/users/dashboard" component={UsersDashBoard} />
          <Route exact path="/users/sign-up">
            <Social />
          </Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </main>
    );
  }
}

export default Main;
