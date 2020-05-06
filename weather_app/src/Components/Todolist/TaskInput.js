import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const CustomInput = withStyles((theme) => ({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .Mui-focused": {
      // Khi focus thì black, không thì white
      "& input": {
        color: "black!important",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
  },
}))(TextField);
const CustomButton = withStyles((theme) => ({
  root: {
    fontSize: "15px",
    lineHeight: "unset",
  },
}))(Button);

const style = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  custom_input_pure_css: {
    marginRight: 15,
    marginLeft: 70,
  },
  cl_white: {
    color: "white",
  },
});

let log = console.log;
class TaskInput extends Component {
  state = {
    inputValue: "",
    description: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };

  // handleInputChange
  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  // handleAddClick
  handleAddClick = (event) => {
    const { addTask } = this.props;
    const { inputValue } = this.state;

    if (inputValue === "" || inputValue.trim() === "") {
      return log("Không add!");
    }
    addTask(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };
  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <CustomInput
            className={classes.custom_input_pure_css}
            onChange={this.handleInputChange}
            value={inputValue}
          />
          <CustomButton
            className={classes.cl_white}
            type="submit"
            onClick={this.handleAddClick}
          >
            Add
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default withStyles(style)(TaskInput);
