import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
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
}));

// function RealTimeClock() {
//   let clock = new Date();
//   let hour = clock.getHours();
//   let minute = clock.getMinutes();
//   let second = clock.getSeconds();
//   return { hour, minute, second };
// }

// let log = console.log;

function SearchResult(props) {
  const classes = useStyles();

  // let timer = RealTimeClock();

  const { dataSearch } = props;
  const dataIndex = dataSearch.length - 1;
  const dataPutIntoSearchResul = dataSearch[dataIndex];

  //log(dataPutIntoSearchResul);
  //log(isLoading);

  // const [completed, setCompleted] = React.useState(0);
  // React.useEffect(() => {
  //   function progress() {
  //     setCompleted((oldCompleted) => {
  //       if (oldCompleted === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 15; // không biết lấy độ chính xác của axios
  //       return Math.min(oldCompleted + diff, 100);
  //     });
  //   }

  //   const timer = setInterval(progress, 500);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Grid container className={classes.resultBg} spacing={3}>
      <Grid
        className={classes.d_flex_center}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {dataPutIntoSearchResul.place_name}
      </Grid>
      <Grid
        className={classes.d_flex_center}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid className={classes.d_flex_center} item xs={12} sm={12} md={12}>
          {dataPutIntoSearchResul.summary}
        </Grid>
      </Grid>

      <Grid
        className={classes.d_flex_center}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
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
