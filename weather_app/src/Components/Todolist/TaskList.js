import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "200px",
    overflow: "auto",
  },
}));

function TaskList(props) {
  const classes = useStyle();
  return <ul className={classes.root}>{props.children}</ul>;
}

export default TaskList;
