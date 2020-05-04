import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    height: "200px",
    display: "flex",

    alignItems: "center",
    flexDirection: "column",
    overflowY: "scroll",
    padding: "0 25px",
  },
}));

function TaskList(props) {
  const classes = useStyle();
  return (
    <ul id="task-list" className={classes.root}>
      {props.children}
    </ul>
  );
}

export default TaskList;
