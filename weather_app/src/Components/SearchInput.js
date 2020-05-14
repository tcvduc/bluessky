import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

// let log = console.log;
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

// const devURL = "http://localhost:5000";
 const proURL = "https://bluessky.herokuapp.com";

// fetch to geocoding API map box
class SearchInput extends Component {
  state = {
    clientInput: [],
    value: "",
  };

  handleChange = (event) => {
    let clientInput_temporary = event.target.value;
    let newData = [...this.state.clientInput, clientInput_temporary];
    this.setState({
      clientInput: newData,
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const clientInputIndex = this.state.clientInput.length - 1;
    const keyword = this.state.clientInput[clientInputIndex];
    //  log(keyword);
    this.props.client_search(keyword);

    this.props.isLoading(true);

    // const { location } = this.props;

    // location.search = keyword;
    //  log(location);

    Axios.get(`${proURL}/api/suggests/geo_data?search=${keyword}`)
      .then((datas) => {
        // log(data.data); -> object includes lat long place
        //  log(datas);

        // fix query too long ngay chỗ này - lấy lat, long ra
        // const place_Suggestions = datas.data.map((data) => {
        //   return data.place_name;
        // });
        //this.props.suggestions(place_Suggestions);

        this.props.suggestions(datas.data);

        this.props.isLoading(false);
        this.setState({
          value: "",
        });
      })
      .catch((err) => {
        //  log(err.response);
        alert(err.response.data.error);
        //alert(err.response);
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
        <CssTextField
          autoComplete="ok"
          className={classes.margin}
          onChange={this.handleChange}
          id="custom_input"
          label="Place"
          fullWidth={true}
          value={this.state.value}
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
    // Tận dụng isloading làm popup effect
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
