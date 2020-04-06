import React from "react";
import WeatherApp from "./Components/WeatherApp";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

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
