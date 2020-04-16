import React from "react";
import { withStyles, AppBar, Grid, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  no_border_bottom: {
    borderBottom: "none",
  },
  footer_bg: {
    backgroundImage: "",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar_pure_css: {
    backgroundColor: "transparent",
    boxShadow: "none!important",
  },
  button_pure_css: {
    color: "white",
    textDecoration: "none",
    "& a": {
      transition: "0.5s",
      transformOrigin: "right",
      fontSize: "17px",
      padding: 10,
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },
  link_pure_css: {
    color: "white",
    textDecoration: "none",
  },
});

let log = console.log;

class Footer extends React.Component {
  render() {
    const { classes, loginHandle } = this.props;
    const handleClickLogin = (event) => {
      loginHandle(event);
    };
    return (
      <footer>
        <Box className={classes.root}>
          <AppBar className={classes.appBar_pure_css} position="static">
            <Grid
              direction="row"
              container
              spacing={3}
              wrap="nowrap"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  className={classes.button_pure_css}
                  onClick={(event) => {
                    handleClickLogin(event);
                  }}
                >
                  <Link
                    to="/social/users/login"
                    className={classes.link_pure_css}
                  >
                    Login
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button_pure_css}>
                  <Link to="/social" className={classes.link_pure_css}>
                    Sign Up
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
