import React from "react";
import WeatherApp from "./Components/WeatherApp";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Home from "./Components/Home";
import About from "./Components/About";

// custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "hsla(0, 0%, 100%, 0.884);",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <WeatherApp></WeatherApp>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
