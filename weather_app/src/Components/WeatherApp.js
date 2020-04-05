import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { withStyles, Grid, Container, Box } from "@material-ui/core";

import Home from "./Home";
import About from "./About";
import MainBackGround from "./../assets/image/8k.gif";
import AboutBackGround from "./../assets/image/8k2.jpg";

import PropTypes from "prop-types";
import { withRouter } from "react-router";

const styles = (theme) => ({
  root: {},
  behindHomeBg: {
    backgroundImage: `url(${MainBackGround})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    filter: "blur(0)",
    zIndex: 1,
  },
  behindAboutBg: {
    backgroundImage: `url(${AboutBackGround})`,
    backgroundPosition: "initial",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    filter: "blur(0)",

    zIndex: 1,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  pb_0: {
    paddingBottom: 0 + "!important",
  },
  pt_0: {
    paddingTop: 0 + "!important",
  },

  homeComponentBg: {
    position: "absolute",
    borderRadius: "5px",
    backgroundImage: `url(${MainBackGround})`,
    backgroundPosition: "initial",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "80vh",
    width: "27vw",
    boxShadow: "0px 1px 20px 0px black",
    zIndex: 2,
    top: "53%",
    left: "52%",
    transform: "translate(-50%,-50%)",
  },
  aboutComponentBg: {
    position: "absolute",
    borderRadius: "5px",
    backgroundImage: `url(${AboutBackGround})`,
    backgroundPosition: "initial",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "80vh",
    width: "27vw",
    boxShadow: "0px 1px 20px 0px black",
    zIndex: 2,
    top: "53%",
    left: "52%",
    transform: "translate(-50%,-50%)",
  },
  container_pure_css: {
    padding: "0!important",
    margin: "0!important",
    height: "100vh",
    width: "100vw",
  },
  top_place: {
    height: "15%",
  },
  bottom_place: {
    height: "85%",
  },
});

class WeatherApp extends Component {
  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;
    console.log(pathname);

    const checkPathWeatherApp = (path) => {
      if (path === "/home") {
        return classes.homeComponentBg;
      } else if (path === "/about") {
        return classes.aboutComponentBg;
      }
      return " ";
    };

    const checkPathBehindBgWeatherApp = (path) => {
      if (path === "/home") {
        return classes.behindHomeBg;
      } else if (path === "/about") {
        return classes.behindAboutBg;
      }
      return " ";
    };

    return (
      <Container maxWidth="100vw" className={classes.container_pure_css}>
        <div className={checkPathBehindBgWeatherApp(pathname)}></div>

        <Grid
          container
          wrap
          spacing={5}
          className={checkPathWeatherApp(pathname)}
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.pb_0 + " " + classes.top_place}
          >
            <Header></Header>
          </Grid>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.pt_0 + " " + classes.bottom_place}
          >
            <Main></Main>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(WeatherApp));
