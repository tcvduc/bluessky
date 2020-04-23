import React from "react";
import { Box, withStyles, Grid } from "@material-ui/core";
import "./../sass/svg.css";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";
import UsersLogin from "./Users/UsersLogin";
import UsersSignup from "./Users/UsersSignup";
import SocialMedia from "./SocialMedia";
import classnames from "classnames";
const style = (theme) => ({
  social_icon_css: {
    height: 30,
    width: 30,
  },
  but_css: {
    background: "transparent",
    outline: "none",
    border: "none",
    cursor: "pointer",
    height: "fit-content",
    width: "fit-content",
    padding: 15,
    "&:hover": {
      "& path": {
        fill: "black",
      },
    },
  },
  width_50: {
    width: "50%",
  },
  footer_coponent_css: {
    marginTop: "10%",
  },
  //  animation slider
  test: {
    height: "100%",
    width: "100%",
  },
  father: {
    overflow: "hidden",
    position: "relative",
  },
  child: {
    width: "100%",
    position: "absolute",
    transition: "0.5s",
  },
  // child 1 - socialmedia component
  child_1: {
    top: 0,
    left: "50%",
    transform: "translate(-50%, 0)",
    transition: "0.7s",
  },
  hideSocialMedia: {
    left: 0,
    transform: "translate(-100%,0)",
  },
  // Thấy logic không hợp lý, cất để đó
  // hideSocialMedia_login: {
  //   left: 0,
  //   transform: "translate(-100%, 0)",
  // },
  // hideSocialMedia_signup: {
  //   right: 0,
  //   transform: "translate(100%, 0)",
  // },
  // child 2 - userlogin component
  child_2: {
    top: 0,
    left: "100%",
  },
  // child 3 - usersignup component
  child_3: {
    top: 0,
    left: "-100%",
  },

  showUsersLogin: {
    left: 0,
  },
  hideUsersLogin: {
    left: "100%",
  },
  showUsersSignup: {
    left: 0,
  },
});

let log = console.log;

class Social extends React.Component {
  // login
  loginHandle = (event) => {
    // log("footer is touching social");
    const { location } = this.props;

    // history.push("/social/users/login");
    // location.pathname = "/social/users/login";

    // log(location);
    // log(history);
    // log("event " + event);

    if (location.pathname === "/social") {
      return true;
    } else if (location.pathname === "/users/login") {
      return false;
    }
    // return true;
  };

  // signup
  signupHandle = () => {
    // log("footer touching social");
  };

  // logic không hợp lý
  // hideSocialMediaWhenLoginClick = () => {
  //   if (this.showUsersLogin() === true) {
  //     const { location } = this.props;
  //     if (location.pathname !== "/social") {
  //       return true;
  //     }
  //     return false;
  //   }
  // };

  // hideSocialMediaWhenSignupClick = () => {
  //   if (this.showUsersSignup() === true) {
  //     const { location } = this.props;
  //     if (location.pathname !== "/social") {
  //       return true;
  //     }
  //     return false;
  //   }
  // };

  hideSocialMedia = () => {
    const { location } = this.props;
    if (location.pathname === "/social") {
      return false;
    }
    return true;
  };

  showUsersLogin = () => {
    const { location } = this.props;
    if (location.pathname === "/users/login") {
      return true;
    }
    return false;
  };
  // Nếu đăng nhập thành công thì giấu form này đi chuyển thành login thành công
  hideUsersLogin = (isloginSuccess) => {
    // Vì mất căn bản life cicle nên chơi dơ bằng cách này
    if (this.handleLoginSuccess(isloginSuccess)) {
      return true;
    }
    return false;
  };

  showUsersSignup = () => {
    const { location } = this.props;
    if (location.pathname === "/users/sign-up") {
      return true;
    }
    return false;
  };

  handleLoginSuccess = (isloginSuccess) => {
    if (isloginSuccess) {
      return true;
    } else {
      return false;
    }
  };

  // Làm hiệu ứng slider - test từ hover sang click rồi sang handle
  // Tìm cách viết điều kiện classes ==>> npm classnames
  // Làm từ CSS sang material ui
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Grid item>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <div id="slider" className={classes.father}>
              <div
                className={classnames(classes.child, classes.child_1, {
                  [classes.hideSocialMedia]: this.hideSocialMedia() === true,
                })}
              >
                <SocialMedia />
              </div>
              <div
                className={classnames(classes.child, classes.child_2, {
                  [classes.showUsersLogin]: this.showUsersLogin() === true,
                  [classes.hideUsersLogin]: this.hideUsersLogin() === true,
                })}
              >
                {1 > 2 ? (
                  <UsersLogin
                    onLogin={this.handleLoginSuccess}
                    hideUsersLogin={this.hideUsersLogin}
                  />
                ) : (
                  "yess"
                )}
              </div>
              <div
                className={classnames(classes.child, classes.child_3, {
                  [classes.showUsersSignup]: this.showUsersSignup() === true,
                })}
              >
                <UsersSignup />
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item className={classes.footer_coponent_css}>
          <Footer
            loginHandle={this.loginHandle}
            signupHandle={this.signupHandle}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(style)(Social));
