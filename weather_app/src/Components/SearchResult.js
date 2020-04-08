import React from "react";
import { makeStyles, Grid, LinearProgress, Box } from "@material-ui/core";
import "./../sass/svg.css";
import { connect } from "react-redux";
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

// let log = console.log;

function SearchResult(props) {
  const classes = useStyles();

  let timer = RealTimeClock();

  const { dataSearch, isLoading } = props;
  const dataIndex = dataSearch.length - 1;
  const dataPutIntoSearchResul = dataSearch[dataIndex];

  //log(dataPutIntoSearchResul);
  //log(isLoading);

  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 15; // không biết lấy độ chính xác của axios
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return isLoading ? (
    <Box justifyContent="center" alignItems="center" className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={completed}
        color="secondary"
      />
    </Box>
  ) : (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid className={classes.d_flex_center} item md={6}>
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
      <Grid className={classes.d_flex_center} item xs={6} sm={6} md={6}>
        icon
      </Grid>

      <Grid className={classes.d_flex_center} item xs={12} sm={12} md={12}>
        {dataPutIntoSearchResul.place_name}
      </Grid>
      <Grid className={classes.d_flex_center} item xs={12} sm={12} md={12}>
        <Grid className={classes.d_flex_center} item xs={12} sm={12} md={12}>
          {dataPutIntoSearchResul.summary}
        </Grid>
      </Grid>

      <Grid className={classes.d_flex_center} item xs={12} sm={12} md={12}>
        {dataPutIntoSearchResul.temperature
          ? dataPutIntoSearchResul.temperature + " °C "
          : ""}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    dataSearch: state.clientResult,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
