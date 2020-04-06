import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import { withStyles, Grid, Container } from "@material-ui/core";
import HomeBackGround from "./../assets/image/8k2.jpg";
import socialBackGround from "./../assets/gif/8k.gif";
import { withRouter } from "react-router";
import Footer from "./Footer";
const styles = (theme) => ({
  root: {},
  behindHomeBg: {
    backgroundImage: `url(${HomeBackGround})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    filter: "blur(0)",
    zIndex: 1,
  },
  behindsocialBg: {
    backgroundImage: `url(${socialBackGround})`,
    backgroundPosition: "left(100px)",
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
    backgroundImage: `url(${HomeBackGround})`,
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
  socialComponentBg: {
    position: "absolute",
    borderRadius: "5px",
    backgroundImage: `url(${socialBackGround})`,
    backgroundPosition: "center",
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

    // handle path background weatherapp component
    const checkPathWeatherApp = (path) => {
      if (path === "/home" || path === "/") {
        return classes.homeComponentBg;
      } else if (path === "/social") {
        return classes.socialComponentBg;
      }
      return " ";
    };
    /* function handle background fullwidth app */
    const checkPathBehindBgWeatherApp = (path) => {
      if (path === "/home" || path === "/") {
        return classes.behindHomeBg;
      } else if (path === "/social") {
        return classes.behindsocialBg;
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
          <Grid item md={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(WeatherApp));
