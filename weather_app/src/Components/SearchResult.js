import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import "./../sass/svg.css";
import { connect } from "react-redux";
import classnames from "classnames";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  resultBg: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    padding: "0 20px",
    overflow: "auto",
  },
  d_flex_end: {
    display: "flex",
    justifyContent: "flex-end",
  },
  d_flex_center: {
    display: "flex",
    justifyContent: "center",
  },
  time_and_icon: {
    alignItems: "center",
  },
  weather_status_icon: {
    height: 25,
    width: 25,
  },
  clock_icon: {
    height: 25,
    width: 25,
  },
  timer: {
    display: "flex",
  },

  mr_10: {
    marginRight: 10,
  },
  linear: {
    width: "100%",
  },
  place_name_css: {
    textAlign: "center",
  },
  summary_text_css: {},
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
  w_50: {
    width: "50%",
  },
  fore_result_css: {
    textAlign: "center",
  },
}));

// let log = console.log;

// Làm hiệu ứng popup cho cái này
// làm từ css chay sang material ui

function SearchResult(props) {
  const classes = useStyles();

  const { dataSearch, darkskyLoading } = props;
  const dataIndex = dataSearch.length - 1;
  const dataPutIntoSearchResul = dataSearch[dataIndex];

  // Dự báo thời tiết
  const { forecastResult, forecastLoading } = props;
  return (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid
        className={classnames(
          classes.d_flex_center,
          classes.place_name_css,
          classes.popup_father
        )}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        id="place_name"
      >
        <div
          className={classnames(classes.popup_child, classes.popup_child_1, {
            [classes.popup]: darkskyLoading === false,
          })}
        >
          {dataPutIntoSearchResul.place_name}
        </div>
      </Grid>
      <Grid
        className={classnames(
          classes.d_flex_center,
          classes.popup_father,
          classes.summary_text_css
        )}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        id="summary"
      >
        <Grid
          className={classnames(
            classes.d_flex_center,
            classes.popup_child,
            classes.popup_child_1,
            {
              [classes.popup]: darkskyLoading === false,
            }
          )}
          item
          xs={12}
          sm={12}
          md={12}
        >
          {dataPutIntoSearchResul.summary}
        </Grid>
      </Grid>

      <Grid
        className={classnames(classes.d_flex_center, classes.popup_father)}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        id="temperature"
      >
        <div
          className={classnames(classes.popup_child, classes.popup_child_1, {
            [classes.popup]: darkskyLoading === false,
          })}
        >
          {dataPutIntoSearchResul.temperature
            ? dataPutIntoSearchResul.temperature + " °C "
            : ""}
        </div>
      </Grid>

      <div className={classnames(classes.popup_father)}>
        <p
          className={classnames(classes.popup_child, classes.popup_child_1, {
            [classes.popup]: forecastLoading === false,
          })}
        >
          {forecastResult.length > 0 ? "Dự báo thời tiết" : ""}
        </p>
      </div>
      {/* dự báo thời tiết */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classnames(classes.d_flex_center, classes.popup_father)}
      >
        <div
          className={classnames(
            classes.popup_child,
            classes.popup_child_1,
            classes.w_50,
            classes.d_flex_center,
            classes.fore_result_css,
            {
              [classes.popup]: forecastLoading === false,
            }
          )}
        >
          {forecastResult.length > 0 ? forecastResult[0][0].time : ""}
        </div>
        <div
          className={classnames(
            classes.popup_child,
            classes.popup_child_1,
            classes.w_50,
            classes.d_flex_center,
            classes.fore_result_css,
            {
              [classes.popup]: forecastLoading === false,
            }
          )}
        >
          {forecastResult.length > 0 ? forecastResult[0][1].time : ""}
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {forecastResult.length > 0 ? forecastResult[0][4].time : "asd"}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSearch: state.clientResult,
    darkskyLoading: state.darkskyLoading,
    // dự báo thời tiết
    forecastResult: state.forecastResult,
    forecastLoading: state.forecastLoading,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
