import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {},
  w_100: {
    width: "100%!important",
  },
});

class SearchInput extends Component {
  state = {
    clientInput: "",
    clientOutput: "api/weather",
  };
  handleChange = (event) => {
    this.setState({
      clientInput: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <form
        action="/search"
        noValidate
        className={classes.w_100}
        id="unique_form"
        onSubmit={this.handleSubmit}
      >
        <TextField
          name="clientInput"
          onChange={this.handleChange}
          className={classes.textField_color}
          label="Place"
          autoComplete
          size="large"
          fullWidth={true}
          inputProps={classes.cl_white}
        />
      </form>
    );
  }
}

export default withStyles(styles)(SearchInput);
