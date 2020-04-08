import React from "react";
import { withStyles, AppBar, Grid, Button, Link, Box } from "@material-ui/core";

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

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

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
                <Button className={classes.button_pure_css}>
                  <Link to="/home" className={classes.link_pure_css}>
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
