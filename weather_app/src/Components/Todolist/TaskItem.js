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
  cl_black: {
    color: "black",
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
    padding: "5px",
    "& li": {
      listStyle: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    display: "flex",
    justifyContent: "space-between",
    transition: "0.1s",
  },
  completed: {
    border: "2px solid black",
    borderRadius: "10px",
    textDecoration: "line-through",
    color: "black",
  },
  in_completed: {
    border: "2px solid white",
    borderRadius: "10px",
    textDecoration: "none",

    color: "white",
  },
});

// let log = console.log;
class TaskItem extends Component {
  state = {};
  handleItemClick = (event) => {
    const { itemClick } = this.props;
    itemClick();
    //  log(completed);
  };

  // del item btn click
  handleDelItemClick = (event) => {
    event.stopPropagation();
    const { delItem, id } = this.props;
    delItem(id);
  };
  render() {
    const { id, description, completed, classes } = this.props;

    return (
      <div
        onClick={this.handleItemClick}
        className={classnames(
          classes.w_100,
          classes.task_item_pure_css,
          classes.cl_white,
          classes.mb_15,
          {
            [classes.completed]: completed,
            [classes.in_completed]: !completed,
          }
        )}
      >
        <div className={classes.item_id}>{id} </div>
        <li className={classnames(classes.item_description)}>{description}</li>
        <CustomButton
          onClick={this.handleDelItemClick}
          className={
            (classes.btn_del_item,
            {
              [classes.cl_white]: !completed,
              [classes.cl_black]: completed,
            })
          }
          variant="text"
        >
          X
        </CustomButton>
      </div>
    );
  }
}

export default withStyles(style)(TaskItem);
