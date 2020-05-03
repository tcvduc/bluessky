import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import classnames from "classnames";

const CustomButton = withStyles((theme) => ({
  root: {
    "&:hover": {},

    ".MuiButton-text": {},
    padding: "2px 2px",
    lineHeight: "unset",
    minWidth: 50,
  },
}))(Button);

const style = (theme) => ({
  root: {},
  cl_white: {
    color: "white",
  },
  w_100: {
    width: "100%",
  },
  mb_15: {
    marginBottom: 15,
  },
  item_id: {
    display: "flex",

    alignItems: "center",
    marginLeft: "20px",
  },
  item_description: {
    display: "flex",

    alignItems: "center",
  },
  btn_del_item: {},
  task_item_pure_css: {
    border: "2px solid white",
    borderRadius: "10px",
    padding: "5px",
    "& li": {
      listStyle: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  completed: {
    textDecoration: "line-through",
  },
});
class TaskItem extends Component {
  render() {
    const { id, description, completed, classes } = this.props;

    return (
      <div
        className={classnames(
          classes.w_100,
          classes.task_item_pure_css,
          classes.cl_white,
          classes.mb_15,
          {
            [classes.completed]: completed,
          }
        )}
      >
        <div className={classes.item_id}>{id} </div>
        <li className={classnames(classes.cl_white, classes.item_description)}>
          {description}
        </li>
        <CustomButton
          className={(classes.btn_del_item, classes.cl_white)}
          variant="text"
        >
          X
        </CustomButton>
      </div>
    );
  }
}

export default withStyles(style)(TaskItem);
