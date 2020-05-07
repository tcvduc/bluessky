import React, { Component } from "react";
import { withStyles, Box, Grid, Button, TextField } from "@material-ui/core";
import classnames from "classnames";
import Axios from "axios";
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
  w_80: {
    width: "80%",
  },
  center_stuff_by_margin: {
    margin: "0 auto",
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

//const devURL = "http://localhost:5000";
const proURL = "https://bluessky.herokuapp.com";
class UsersSignup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    signUpSuccess: false,
    errorGetFromServer: "",
  };

  // handle change usersname
  handleChangeUsersname = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  // handle change password
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  // handle change email
  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  // handle submit sign up
  handleSubmitUsersSignup = async (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    //  log(username, password, email);

    const dataSendToServer = {
      username,
      password,
      email,
    };
    JSON.stringify(dataSendToServer);

    // log(dataSendToServer);
    // axios

    await Axios.post(`${proURL}/users/sign-up`, dataSendToServer)
      .then((result) => {
        const { data } = result;
        const { error } = data;

        if (error) {
          this.setState({
            signUpSuccess: false,
            errorGetFromServer: error,
          });
          throw new Error(error);
        }
        //  log(data);
        alert(data.message);
        this.setState({
          signUpSuccess: true,
        });
      })
      .catch((er) => {
        this.setState({
          signUpSuccess: false,
        });
        alert(er);
        //  log(er);
      });
  };

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
              onChange={this.handleChangeUsersname}
            />
            <UserTextField
              className={classes.mb_20}
              label="Password"
              type="password"
              onChange={this.handleChangePassword}
            />
            <UserTextField
              className={classes.mb_20}
              label="Email"
              type="email"
              onChange={this.handleChangeEmail}
            />
            <SubmitButton
              className={classnames(
                classes.p_5,
                classes.center_stuff_by_margin,
                classes.w_80
              )}
              variant="contained"
              type="submit"
              color="primary"
            >
              Sign up
            </SubmitButton>
          </form>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(style)(UsersSignup);
