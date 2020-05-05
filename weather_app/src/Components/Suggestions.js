import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import classnames from "classnames";
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
  mb_20: {
    marginBottom: 20,
  },

  // popup effect
  popup_father: {
    backgroundColor: "transparent",
    width: "100%,",
    overflow: "hidden",
  },
  popup_child: {
    backgroundColor: "transparent",
    transition: "0.5s",
  },
  popup_child_1: {
    transform: "translate(0, 100%) rotate(6deg)",
  },
  popup: {
    animation: "popup 1s forwards",
  },
});

let log = console.log;

// Làm hiệu ứng popup cho cái này
// Từ hover trồi lên sang tự động trồi lên
// làm từ css chay sang css trong reactjs sang material ui

// Fetch to darksky API forecast
class Autocomplete extends Component {
  state = {
    suggestions: [],
  };

  // Thêm chức năng mới - đưa ra dự báo cho những ngày sau
  handleSearchClick = (event, index) => {
    const dataSuggestions = [...this.props.suggestions];

    // log(dataSuggestions);
    // log(index);
    const keywords = dataSuggestions[index];
    // log(dataSuggestions);
    const devURL = "http://localhost:5000";
    // const productionsURL = "https://bluessky.herokuapp.com";

    this.props.darksky_loading(true);
    Axios.get(`${devURL}/api/weather?search=${keywords}`)
      .then((datas) => {
        this.props.client_result(datas.data);
        this.props.darksky_loading(false);
        // khi có data rồi mới chuyển icon mưa hay nắng
        const { clickMeanUpdateStatusWeather } = this.props;
        clickMeanUpdateStatusWeather();
      })
      .catch((er) => {
        log(er);
      });

    // Dự báo thời tiết
    this.props.forecast_loading(true);
    Axios.get(`${devURL}/api/forecast/${keywords}`)
      .then((rs) => {
        this.props.forecast_result(rs.data);
        this.props.forecast_loading(false);
      })
      .catch((er) => {
        log(er);
      });

    // clear suggestions
    this.props.clear_suggestions();
  };
  render() {
    const { classes } = this.props;
    // log(this.props);
    // khi trong giỏ gợi ý rỗng thì xuất kết quả
    return (
      <div id="suggestions" className={classes.root}>
        {this.props.suggestions.map((suggest, index) => {
          return (
            <div
              key={index}
              className={classnames(classes.mb_20, classes.popup_father)}
            >
              <li
                className={classnames(
                  classes.popup_child,
                  classes.popup_child_1,
                  {
                    [classes.popup]: this.props.isLoading === false,
                  }
                )}
                // tận dụng index để xác định target click
                onClick={(event) => {
                  this.handleSearchClick(event, index);
                }}
              >
                {suggest}
              </li>
            </div>
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
    darksky_loading: (loading) => {
      dispatch({
        type: "DARKSKY_LOADING",
        payload: loading,
      });
    },
    // Dự báo thời tiết
    forecast_result: (result) => {
      dispatch({
        type: "FORECAST_RESULT",
        payload: result,
      });
    },
    forecast_loading: (loading) => {
      dispatch({
        type: "FORECAST_LOADING",
        payload: loading,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Autocomplete));
