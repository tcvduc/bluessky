import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {},
  w_100: {
    width: "100%!important",
  },
});

let log = console.log;

class SearchInput extends Component {
  state = {
    clientInput: [],
  };

  handleChange = (event) => {
    let clientInput_temporary = event.target.value;
    let newData = [...this.state.clientInput, clientInput_temporary];
    this.setState({
      clientInput: newData,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const clientInputIndex = this.state.clientInput.length - 1;
    const keyword = this.state.clientInput[clientInputIndex];
    //  log(keyword);
    this.props.client_search(keyword);

    this.props.isLoading(true);

    Axios.get(`http://localhost:5000/api/weather?search=${keyword}`)
      .then((data) => {
        // log(data.data);
        this.props.client_result(data.data);
        this.props.isLoading(false);
      })
      .catch((err) => {
        log(err);
      });
  };

  render() {
    const { classes } = this.props;
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

const mapStateToProps = (state) => {
  return {
    clientInput: state.clientInput,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    client_search: (value) => {
      dispatch({
        type: "SEARCH",
        payload: value,
      });
    },
    client_result: (result) => {
      dispatch({
        type: "RESULT",
        payload: result,
      });
    },
    isLoading: (isLoading) => {
      dispatch({
        type: "LOADING",
        payload: isLoading,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SearchInput)));
