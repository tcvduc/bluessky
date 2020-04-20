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
}));

// let log = console.log;

// Làm hiệu ứng popup cho cái này
// làm từ css chay sang material ui

function SearchResult(props) {
  const classes = useStyles();

  const { dataSearch, darkskyLoading } = props;
  const dataIndex = dataSearch.length - 1;
  const dataPutIntoSearchResul = dataSearch[dataIndex];

  return (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid
        className={classnames(classes.d_flex_center, classes.popup_father)}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
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
        className={classnames(classes.d_flex_center, classes.popup_father)}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
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
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSearch: state.clientResult,
    darkskyLoading: state.darkskyLoading,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
