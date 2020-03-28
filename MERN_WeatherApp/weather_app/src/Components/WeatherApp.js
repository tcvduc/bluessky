import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { makeStyles, Paper, Grid } from "@material-ui/core";

import Home from "./Home";
import About from "./About";
const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function WeatherApp(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container wrap spacing={5}>
        <Grid item xl={12} lg={12} md={12}>
          <Header></Header>
        </Grid>
        <Grid item xl={12} lg={12} md={12}>
          <Main></Main>
        </Grid>
        <Grid item xl={12} lg={12} md={12}>
          <Footer></Footer>
        </Grid>
      </Grid>
    </div>
  );
}

export default WeatherApp;
