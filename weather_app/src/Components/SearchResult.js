import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import "./../sass/svg.css";

const useStyles = makeStyles((theme) => ({
  root: {},
  resultBg: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    padding: "0 20px",
  },
  d_flex: {
    display: "flex",
  },
  time_icon_css: {},
  mr_10: {
    marginRight: 10,
  },
}));

function RealTimeClock() {
  let clock = new Date();
  let hour = clock.getHours();
  let minute = clock.getMinutes();
  let second = clock.getSeconds();
  return { hour, minute, second };
}

function SearchResult(props) {
  const classes = useStyles();

  let timer = RealTimeClock();

  return (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid className={classes.d_flex} item md={6}>
        <div id="time_icon" className={classes.mr_10}>
          <svg
            className="time_icon_css"
            height="20"
            viewBox="0 0 443.294 443.294"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z" />
            <path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z" />
          </svg>
        </div>
        <div id="real-time-clock">{timer.hour + ":" + timer.minute}</div>
      </Grid>
      <Grid
        className={classes.d_flex}
        item
        xs={6}
        sm={6}
        md={6}
        justify="flex-end"
      >
        place
      </Grid>

      <Grid
        className={classes.d_flex}
        item
        xs={12}
        sm={12}
        md={12}
        justify="center"
      >
        icon
      </Grid>
      <Grid
        className={classes.d_flex}
        item
        xs={12}
        sm={12}
        md={12}
        justify="center"
      >
        summary
      </Grid>
      <Grid
        className={classes.d_flex}
        item
        xs={12}
        sm={12}
        md={12}
        justify="center"
      >
        temperature
      </Grid>

      <Grid
        className={classes.d_flex}
        item
        xs={6}
        sm={6}
        md={6}
        justify="flex-start"
      >
        H temp
      </Grid>
      <Grid
        className={classes.d_flex}
        item
        xs={6}
        sm={6}
        md={6}
        justify="flex-end"
      >
        L temp
      </Grid>
      <Grid
        className={classes.d_flex}
        xs={12}
        sm={12}
        item
        md={12}
        justify="center"
      >
        textttt
      </Grid>
    </Grid>
  );
}

export default SearchResult;
