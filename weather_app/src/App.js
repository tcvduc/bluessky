import React from "react";
import WeatherApp from "./Components/WeatherApp";
import "./Global.css";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createStore } from "redux";
import { Provider } from "react-redux";

// custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "hsla(0, 0%, 100%, 0.884);",
    },
    secondary: {
      main: "#f8b5a0",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
  },
});

// Do SearchResult & SearchInput cùng cấp nên không biết quăng data như thế nào nên dùng redux

// init state
const initState = {
  clientInput: [],
  clientResult: [""], // bugs - nếu empty thì bị lỗi undefine
  isLoading: false,
};

// root Reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH": {
      const newClientInput = [...state.clientInput, action.payload];
      return {
        ...state,
        clientInput: newClientInput,
      };
    }
    case "RESULT": {
      const newClientResult = [...state.clientResult, action.payload];
      return {
        ...state,
        clientResult: newClientResult,
      };
    }

    case "LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};

// create store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <WeatherApp></WeatherApp>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
