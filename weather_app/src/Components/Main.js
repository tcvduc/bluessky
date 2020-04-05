import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route path="/api/weather" component={Home}></Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </main>
    );
  }
}

export default Main;
