import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box_content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "50%",
    padding: 50,
  },
  fzf: {
    display: "flex",
    height: "400px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "300px",
    position: "relative",
    "&::before": {
      content: '"Page not found"',
      position: "absolute",
      top: "70%",
      left: "50%",
      fontSize: 50,
      transform: "translate(-50%,0)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "100%",
      left: "50%",
      backgroundColor: "#00000021",
      borderRadius: "100%",
      width: "60%",
      height: "100px",
      fontSize: 50,
      transform: "translate(-50%,0) rotateX(65deg)",
      transformOrigin: "center center",
    },
  },
  pnf: {
    display: "flex",

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PageNotFound = (props) => {
  const classes = useStyles(props);

  return (
    <Box
      top="0"
      left="0"
      position="fixed"
      height="100vh"
      width="100vw"
      className={classes.root}
    >
      <Box className={classes.box_content}>
        <div className={classes.fzf}>404</div>
      </Box>
    </Box>
  );
};

export default PageNotFound;
