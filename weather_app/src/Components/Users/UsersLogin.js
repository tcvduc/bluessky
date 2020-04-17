import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const style = () => ({
  root: {},
  loginContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input_group: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 15,
    marginBottom: 100,
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
});

const UserNameTextField = withStyles({
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

const SubmitButton = withStyles((theme) => ({
  root: {
    color: "white",
    fontFamily: "Baloo Tammudu 2, cursive, sans-serif",
    fontWeight: 400,
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

let log = console.log;

class UsersLogin extends React.Component {
  handleUsersLogin = (event) => {
    event.preventdefault();
    log(event);
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container id="UsersLogin" className={classes.loginContainer}>
        <form className={classes.input_group} onSubmit={this.handleUsersLogin}>
          <UserNameTextField label="Username" className={classes.mb_20} />
          <UserNameTextField
            label="Password"
            className={classes.mb_20}
            type="password"
          />
          <SubmitButton
            variant="contained"
            color="primary"
            className={classes.w_50 + " " + classes.p_10}
            type="submit"
          >
            Login
          </SubmitButton>
        </form>
      </Grid>
    );
  }
}

export default withStyles(style)(UsersLogin);
