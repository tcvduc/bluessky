import React, { Component } from "react";
import { makeStyles, Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  resultBg: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    padding: "0 20px",
  },
  d_flex: {
    display: "flex",
  },
}));

function SearchResult(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid className={classes.d_flex} item md={6} justify="flex-start">
        time
      </Grid>
      <Grid className={classes.d_flex} item md={6} justify="flex-end">
        place
      </Grid>

      <Grid className={classes.d_flex} item md={12} justify="center">
        icon
      </Grid>
      <Grid className={classes.d_flex} item md={12} justify="center">
        summary
      </Grid>
      <Grid className={classes.d_flex} item md={12} justify="center">
        temperature
      </Grid>

      <Grid className={classes.d_flex} item md={6} justify="flex-start">
        H temp
      </Grid>
      <Grid className={classes.d_flex} item md={6} justify="flex-end">
        L temp
      </Grid>
      <Grid className={classes.d_flex} item md={12} justify="center">
        textttt
      </Grid>
    </Grid>
  );
}

export default SearchResult;
