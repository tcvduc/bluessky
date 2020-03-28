import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>

        {/* page not found*/}
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    );
  }
}

export default Main;
