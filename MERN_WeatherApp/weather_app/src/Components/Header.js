import React, { Component } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Grid
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import Home from "./Home";
import About from "./About";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar_pure_css: {
    backgroundColor: "#222f3e",
    padding: 10
  },
  button_pure_css: {
    color: "white",
    textDecoration: "none"
  },
  link_pure_css: {
    color: "white",
    textDecoration: "none"
  }
}));

function Header(props) {
  const classes = useStyles();
  return (
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
            <Button className={classes.button_pure_css}>
              <Link to="/home" className={classes.link_pure_css}>
                Home
              </Link>
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button_pure_css}>
              <Link to="/about" className={classes.link_pure_css}>
                About
              </Link>
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}

export default Header;
