import React from "react";
import { makeStyles, AppBar, Box, Grid, Button } from "@material-ui/core";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {},
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
    fontSize: "17px",
    padding: 15,
  },
  link_pure_css: {
    color: "white",
    textDecoration: "none",
  },
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
              <Link to="/social" className={classes.link_pure_css}>
                Social
              </Link>
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}

export default Header;
