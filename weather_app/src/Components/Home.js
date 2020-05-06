import React from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchInput from "./SearchInput";
import Suggestions from "./Suggestions";
import SearchResult from "./SearchResult";
import { ReactComponent as RainIcon } from "./../assets/svg/rain.svg";
import { ReactComponent as SunIcon } from "./../assets/svg/sun.svg";
import classnames from "classnames";
import { connect } from "react-redux";
const usestyles = makeStyles((theme) => ({
  root: {},
  home_background: {
    height: "100%",
  },
  cl_white: {
    color: "white",
  },
  search_box: {
    height: "10%",
    padding: "15px",
  },
  result_box: {
    height: "90%",
  },
  //
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
  homeContent: {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "20px 0",
    backgroundColor: "transparent",
  },
  statusFather: {
    position: "relative",
    overflow: "hidden",
  },
  statusChild: {
    position: "absolute",
    top: 0,
    left: 0,
    transition: "0.5s",
  },
  statusChild_Sun: {
    top: 0,
  },
  statusChild_Rain: {
    top: "-100%",
  },
  rain_appear: {
    top: 0,
  },
  rain_dissapear: {
    top: "-100%",
  },

  sun_dissapear: {
    top: "100%",
  },
  sun_appear: {
    top: 0,
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
//  học hook cái này - có chức năng gì làm bằng hook hết
// list chức năng: chuyển icon mưa nắng, thời gian tự động
function Home(props) {
  const classes = usestyles();
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

  // log(this.state.foreData);
  let timer = RealTimeClock();

  // status default
  const [statusWeather, setStausWeather] = React.useState(0);

  // status of result

  const handleStatusResult = () => {
    const { client_result } = props;
    //  log(props);
    // log(client_result);
    if (client_result) {
      setStausWeather(client_result[client_result.length - 1].iconStatus);
    }
  };
  const [didUpdate, setDidUpdate] = React.useState(false);

  const isDidUpdate = () => {
    if (didUpdate) {
      setDidUpdate(false);
    } else {
      setDidUpdate(true);
    }
  };

  React.useEffect(() => {
    handleStatusResult();
  }, [didUpdate]);

  // React.useEffect(() => {
  //   log(statusWeather);
  // });

  // test icon status
  // const handleClickChangeStatus = (e) => {
  //   if (statusWeather === "Mưa") {
  //     setStausWeather("Nắng");
  //   } else {
  //     setStausWeather("Mưa");
  //   }
  // };
  return (
    <Box
      display="flex"
      justifyContent="around"
      flexDirection="column"
      alignItems="center"
      className={classes.home_background}
    >
      <Box
        className={classes.cl_white + " " + classes.search_box}
        width="80%"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
      >
        <SearchInput />
      </Box>
      <Box className={classes.cl_white + " " + classes.result_box} width="100%">
        <Grid container className={classes.homeContent}>
          <Grid
            className={classes.d_flex_center + " " + classes.time_and_icon}
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <div className={classes.timer}>
              <div
                id="time_icon"
                className={classes.mr_10 + " " + classes.clock_icon}
              >
                <svg viewBox="0 0 443.294 443.294">
                  <path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z" />
                  <path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z" />
                </svg>
              </div>
              <div id="real-time-clock">
                {timer.hour + ":" + timer.minute + ":" + timer.second}
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.d_flex_center + " " + classes.time_and_icon}
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <div
              className={
                classes.weather_status_icon + " " + classes.statusFather
              }
            >
              {/* status icon */}

              <RainIcon
                className={classnames(
                  classes.statusChild,
                  classes.statusChild_Rain,
                  {
                    [classes.rain_appear]: statusWeather === "Mưa",
                    [classes.rain_dissapear]: statusWeather === "Nắng",
                  }
                )}
              />

              <SunIcon
                className={classnames(
                  classes.statusChild,
                  classes.statusChild_Sun,
                  {
                    [classes.sun_dissapear]: statusWeather === "Mưa",
                    [classes.sun_appear]: statusWeather === "Nắng",
                  }
                )}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* <Button onClick={handleClickChangeStatus}>
              {" "}
              change status icon
            </Button> */}
            <Suggestions clickMeanUpdateStatusWeather={isDidUpdate} />
            <SearchResult />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    client_result: state.clientResult,
  };
};

export default connect(mapStateToProps, null)(Home);
