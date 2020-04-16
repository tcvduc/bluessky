import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

// custom input

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "hsla(0, 0%, 100%, 0.774)",
    },
    "& label.Mui-focused": {
      color: "hsla(0, 0%, 100%, 1)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "hsla(0, 0%, 100%, 0.774)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "hsla(0, 0%, 100%, 0.774)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "hsla(0, 0%, 100%, 1)",
    },
  },
})(TextField);

const styles = (theme) => ({
  root: {},
  w_100: {
    width: "100%!important",
  },
  textField_color: {
    color: "#ffffff",
  },
  cl_green: {
    color: "lightgreen",
  },
  colorSecondary: {
    color: "lightgreen",
  },
  underline: {
    color: "red",
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

    Axios.get(`http://localhost:5000/suggests/geo_data?search=${keyword}`)
      .then((datas) => {
        // log(data.data); -> object includes lat long place
        //  log(datas);
        const place_Suggestions = datas.data.map((data) => {
          return data.place_name;
        });
        this.props.suggestions(place_Suggestions);
        this.props.isLoading(false);
      })
      .catch((err) => log(err));

    // Axios.get(`http://localhost:5000/api/weather?search=${keyword}`)
    //   .then((data) => {
    //     // log(data.data);
    //     this.props.client_result(data.data);
    //     this.props.isLoading(false);
    //   })
    //   .catch((err) => {
    //     log(err);
    //   });
  };

  // renderSuggestion = () => {
  //   const newData = [...this.state.clientInput];
  //   //log(newData);
  // };

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
        <CssTextField
          autoComplete="ok"
          className={classes.margin}
          onChange={this.handleChange}
          id="custom_input"
          label="Place"
          fullWidth={true}
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
    isLoading: (isLoading) => {
      dispatch({
        type: "LOADING",
        payload: isLoading,
      });
    },
    suggestions: (suggests) => {
      dispatch({
        type: "SUGGESTIONS",
        payload: suggests,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SearchInput)));
