import React, { Component } from "react";
import { withStyles, Box, Grid, Button, TextField } from "@material-ui/core";

const style = () => ({
  root: {},
  signupContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input_group: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
  mb_20: {
    marginBottom: 20,
  },
  w_50: {
    width: "50%",
  },
  p_10: {
    padding: 10,
  },
  p_5: {
    padding: 5,
  },
});

// custom text field
const UserTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .Mui-focused": {
      // Khi focus thì black, không thì white
      "& input": {
        color: "black!important",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
  },
})(TextField);

// button custom
const SubmitButton = withStyles((theme) => ({
  root: {
    color: "white",
    fontFamily: "Baloo Tammudu 2, cursive, sans-serif",
    fontWeight: 400,
    fontSize: 20,
    textTransform: "initial",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      color: "black",
    },
  },
}))(Button);
// let log = console.log;
class UsersSignup extends Component {
  handleSubmitUsersSignup = (event) => {
    event.preventDefault();
  };
  handleClickUsersSignup = (event) => {};
  render() {
    const { classes } = this.props;
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
        width="100%"
      >
        <Grid container id="UserSignup" className={classes.signupContainer}>
          <form
            className={classes.input_group}
            onSubmit={this.handleSubmitUsersSignup}
          >
            <UserTextField
              className={classes.mb_20}
              label="Username"
              type="string"
            />
            <UserTextField
              className={classes.mb_20}
              label="Password"
              type="password"
            />
            <UserTextField className={classes.mb_20} label="Email" />
            <SubmitButton
              className={classes.p_5}
              variant="contained"
              fullWidth={true}
              type="submit"
              color="primary"
              onClick={this.handleClickUsersSignup}
            >
              okokok
            </SubmitButton>
          </form>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(style)(UsersSignup);
