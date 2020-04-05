import React, { Component } from "react";
import MainBackGround from "./../assets/image/8k.jpg";
import { Box, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const styles = (theme) => ({
  root: {},
  home_background: {
    height: "100%",
  },
  cl_white: {
    color: "white",
  },
  search_box: {
    height: "10%",
    padding: "15px",
  },
  result_box: {
    height: "90%",
  },
  textField_color: {
    color: "#ffffff",
  },
});

let log = console.log;

class Home extends Component {
  state = {
    clientInput: "",
    geoData: ["ok"],
    foreData: [],
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Box
        display="flex"
        justifyContent="around"
        flexDirection="column"
        alignItems="center"
        className={classes.home_background}
      >
        <Box
          className={classes.cl_white + " " + classes.search_box}
          width="80%"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <SearchInput />
        </Box>
        <Box
          className={classes.cl_white + " " + classes.result_box}
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="result"
        >
          <SearchResult />
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
