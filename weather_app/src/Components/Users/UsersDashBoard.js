import React, { Component } from "react";
import { Box } from "@material-ui/core";

class UsersDashBoard extends Component {
  render() {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <div>User dashboard component</div>
      </Box>
    );
  }
}

export default UsersDashBoard;
