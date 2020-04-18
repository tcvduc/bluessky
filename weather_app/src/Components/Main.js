import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Social from "./Social";

class Main extends Component {
  // routing right there
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/social" component={Social}></Route>
          <Route exact path="/api/weather" component={Home}></Route>
          <Route exact path="/users/login" component={Social}></Route>

          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </main>
    );
  }
}

export default Main;
