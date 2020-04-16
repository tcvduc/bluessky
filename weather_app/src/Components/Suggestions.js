import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

import Axios from "axios";
const style = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: "0 30px",
    "& li": {
      listStyle: "none",
      cursor: "pointer",
    },
  },
});

let log = console.log;

class Autocomplete extends Component {
  state = {
    suggestions: [],
  };

  handleSearchClick = (event, index) => {
    const dataSuggestions = [...this.props.suggestions];
    // log(dataSuggestions);
    // log(index);
    const keywords = dataSuggestions[index];
    // log(dataSuggestions);
    Axios.get(`http://localhost:5000/api/weather?search=${keywords}`)
      .then((datas) => {
        this.props.client_result(datas.data);
      })
      .catch((er) => {
        log(er);
      });

    // clear suggestions
    this.props.clear_suggestions();
  };
  render() {
    const { classes } = this.props;
    // khi trong giỏ gợi ý rỗng thì xuất kết quả
    return (
      <div id="suggestions" className={classes.root}>
        {this.props.suggestions.map((suggest, index) => {
          return (
            <li
              key={index}
              // tận dụng index để xác định target click
              onClick={(event) => {
                this.handleSearchClick(event, index);
              }}
            >
              {suggest}
            </li>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions,
    isLoading: state.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clear_suggestions: () => {
      dispatch({
        type: "CLEAR_SUGGESTIONS",
      });
    },
    client_result: (result) => {
      dispatch({
        type: "RESULT",
        payload: result,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Autocomplete));
