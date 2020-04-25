import React, { Component } from "react";
import { Box } from "@material-ui/core";

// let log = console.log;
class UsersDashBoard extends Component {
  state = {
    user: {},
  };
  handleLoadUser = () => {
    // const devURL = "http://localhost:5000";
    // const proURL = "https://bluessky.herokuapp.com/";
    // const { infor_user } = this.props;
    // this.setState({
    //   user: infor_user,
    // });
  };
  // componentDidMount = () => {
  //   // log(this.state);
  //   const { dataGetFromserver } = this.props;
  //   const { data } = dataGetFromserver;
  //   log(data);
  //   this.setState({
  //     user: data,
  //   });
  // };

  // componentWillUpdate = () => {};
  // componentWillUnmount = () => {
  //   log("Userdashboard unmount");
  // };

  render() {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <div>user dashboard component</div>
      </Box>
    );
  }
}

export default UsersDashBoard;
