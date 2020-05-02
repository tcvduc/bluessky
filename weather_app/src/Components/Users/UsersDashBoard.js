import React, { Component } from "react";
import { Box, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

let log = console.log;
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
    log("User dashboard didmount");
    const userInfor = localStorage.getItem("userInfor");
    if (userInfor) {
      const jsonUserInfor = JSON.parse(userInfor);
      const { user, token } = jsonUserInfor;
      this.setState({
        user,
        token,
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

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <div>{this.state.user.username} dashboard component</div>
        <Button onClick={this.handleLogout}>Logout</Button>
      </Box>
    );
  }
}

export default UsersDashBoard;
