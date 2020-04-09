import React, { Component } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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

});

//let log = console.log;

class Home extends Component {
  state = {
    clientInput: "",
    geoData: ["ok"],
    foreData: [],
  };

  render() {
    const { classes } = this.props;
    // log(this.state.foreData);

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
          <SearchInput   />
        </Box>
        <Box
          className={classes.cl_white + " " + classes.result_box}
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="result"
        >
          {this.state.isLoading ? (
            <LinearProgress
              variant="determinate"
              value={this.state.completed}
            />
          ) : (
            <SearchResult />
          )}
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
