import React, { Component } from "react";
import { Box, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Todolist from "./../Todolist/Todolist";

import { withStyles } from "@material-ui/core";

const style = (theme) => ({
  root: {
    width: "100%",
  },
  cl_white: {
    color: "white",
  },
  h_80: {
    height: "80%",
  },
  h_20: {
    height: "15%",
  },
});
// let log = console.log;
class UsersDashBoard extends Component {
  state = {
    user: {},
    token: "",
    isLogout: false,
  };
  handleLoadUser = () => {
    // const devURL = "http://localhost:5000";
    // const proURL = "https://bluessky.herokuapp.com/";
  };

  // handle logout
  handleLogout = (event) => {
    this.setState({
      user: {},
      token: "",
      isLogout: true,
    });
    localStorage.removeItem("userInfor");
  };
  componentDidMount = () => {
    // log("User dashboard didmount");
    const userInfor = localStorage.getItem("userInfor");
    if (userInfor) {
      const jsonUserInfor = JSON.parse(userInfor);
      const { user, token } = jsonUserInfor;
      this.setState({
        user,
        token,
        isLogout: false,
      });
    } else {
      this.setState({
        isLogout: true,
      });
    }
  };

  componentDidUpdate = () => {
    //  log("User dashboard did update");
  };

  componentWillUnmount = () => {
    //  log("User dashboard will unmount");
  };

  render() {
    const { isLogout } = this.state;
    if (isLogout) {
      return <Redirect to="/social" />;
    }
    const { classes } = this.props;

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <div className={classes.h_20}>{this.state.user.username} TodoList</div>
        <div id="user_main" className={classes.root + " " + classes.h_80}>
          <Todolist />
        </div>
        <div className={classes.h_20}>
          <Button onClick={this.handleLogout} className={classes.cl_white}>
            Logout
          </Button>
        </div>
      </Box>
    );
  }
}

export default withStyles(style)(UsersDashBoard);
