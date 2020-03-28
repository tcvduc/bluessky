import React from "react";
import WeatherApp from "./Components/WeatherApp";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <WeatherApp></WeatherApp>
      </BrowserRouter>
    );
  }
}

export default App;
