import React, { useEffect, useRef, useState } from "react";
import ChartLib from "chart.js";
import { History, ZoneStatus } from "../types/zone";
import moment, { min } from "moment";
import getZoneStatusColor from "../utils/getZoneStatusColor";
import { getDataFromRange } from "../utils/getDataFromRange";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Paper,
  makeStyles,
} from "@material-ui/core";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";

export interface ChartProps {
  data: History[];
  minVisible: number;
}

const useStyles = makeStyles({
  container: {
    borderRadius: 9
  },
  btnStyle: {
    backgroundColor: "white",
    height: 32,
    width: 32
  },
});

const Chart: React.SFC<ChartProps> = (props) => {
  const { data, minVisible } = props;
  let date_list = data.map((d) => moment(d.date).format("YYYY-MM-DD"));
  const classes = useStyles();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [currentVisibleTicks, setCurrentVisibleTicks] = useState({
    from: date_list[date_list.length - 1],
    range: -minVisible,
  });
  const canvas = useRef<any>();
  const chart = useRef<Chart>();

  useEffect(() => {
    const dataFromRange = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: currentVisibleTicks.from,
      range: -Math.abs(currentVisibleTicks.range),
    });
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const chartInstance = new window.Chart(canvas.current, {
      type: "line",
      data: {
        labels: date_list,
        // labels: [...data.map((h) => new Date(h.date))],
        datasets: [
          {
            label: "infected",
            borderColor: getZoneStatusColor(ZoneStatus.YELLOW).textInBlueishBg,
            backgroundColor: getZoneStatusColor(ZoneStatus.YELLOW).textInBlueishBg,
            data: [...data.map((h) => h.infectedNumber)],
          },
          {
            label: "recovered",
            borderColor: getZoneStatusColor(ZoneStatus.GREEN).textInBlueishBg,
            backgroundColor: getZoneStatusColor(ZoneStatus.GREEN).textInBlueishBg,
            data: [...data.map((h) => h.recoveredNumber)],
          },
          {
            label: "dead",
            borderColor: getZoneStatusColor(ZoneStatus.RED).textInBlueishBg,
            backgroundColor: getZoneStatusColor(ZoneStatus.RED).textInBlueishBg,
            data: [...data.map((h) => h.deadNumber)],
          },
        ],
      },
      options: {
        elements: {
          line: {
            fill: false,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (item: any, data: any) => {
              console.log('item', item);
              console.log('data', data);
              return moment(item[0].label).format('DD MMM YYYY')
            },
          },
          backgroundColor: 'white',
          titleFontSize: 14,
          titleFontColor: '#242B43',
          // titleFontStyle: 'inherit 600',
          bodyFontColor: '#242B43',
          bodyFontSize: 12,
          // bodyFontStyle: 'inherit',
          displayColors: false
        },
        scales: {
          xAxes: [
            {
              position: "top",
              type: "time",
              time: {
                // parser: "DD MMM",
                // tooltipFormat: "DD MMM",
                unit: "day",
                minUnit: "day",
              },
              ticks: {
                padding: 24,
                min: dataFromRange.from,
                max: dataFromRange.to,
                // callback: (value: number | string, index: number, values: any) => {
                //   console.log(values[0].value);
                //   const date = values.find((v: any, i: number) => i === index)?.value
                //   console.log('date', date);
                //   const day = moment(date).format('DD')
                //   const weekDay = moment(date).format('ddd')
                //   return day
                // }
              },
              gridLines: {
                drawBorder: false,
              },
            },
          ],
          yAxes: [
            {
              position: "right",
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                padding: 16,
              },
            },
          ],
        },
        plugins: {
          zoom: {
            // Container for pan options
            pan: {
              // Boolean to enable panning
              enabled: true,

              // Panning directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow panning in the y direction
              // A function that is called as the user is panning and returns the
              // available directions can also be used:
              //   mode: function({ chart }) {
              //     return 'xy';
              //   },
              mode: "x",

              rangeMin: {
                //   // Format of min pan range depends on scale type
                x: new Date(date_list[0]).setHours(
                  new Date(date_list[0]).getHours() - 4
                  // new Date(date_list[0]).getHours() - 4
                ),
                //   y: null,
              },
              rangeMax: {
                //   // Format of max pan range depends on scale type
                x: new Date(date_list[date_list.length - 1]).setDate(
                  new Date(date_list[date_list.length - 1]).getDate()
                ),
                //   y: null,
              },

              // // On category scale, factor of pan velocity
              // speed: 40,

              // // Minimal pan distance required before actually applying pan
              // threshold: 10,

              // Function called while the user is panning
              onPan: function ({ chart }: { chart: any }) {
                //   console.log(`I'm panning!!!`);
                setIsGrabbed(true);
              },
              // // Function called once panning is completed
              onPanComplete: function ({ chart }: { chart: any }) {
                console.log(`I was panned!!!`, chart);
                const from = chart.scales["x-axis-0"].ticks[0];
                const range = chart.scales["x-axis-0"].ticks.length - 1;
                setCurrentVisibleTicks({
                  from: moment(from).format("[2019]-MM-DD"),
                  range,
                });
                setIsGrabbed(false);
              },
            },
            // Container for zoom options
            zoom: {
              // Boolean to enable zooming
              enabled: false,

              // Enable drag-to-zoom behavior
              // drag: true,

              // Drag-to-zoom effect can be customized
              // drag: {
              // 	 borderColor: 'rgba(225,225,225,0.3)'
              // 	 borderWidth: 5,
              // 	 backgroundColor: 'rgb(225,225,225)',
              // 	 animationDuration: 0
              // },

              // Zooming directions. Remove the appropriate direction to disable
              // Eg. 'y' would only allow zooming in the y direction
              // A function that is called as the user is zooming and returns the
              // available directions can also be used:
              //   mode: function({ chart: any }) {
              //     return 'xy';
              //   },
              mode: "x",

              rangeMin: {
                // Format of min zoom range depends on scale type
                x: new Date(date_list[0]).setHours(
                  new Date(date_list[0]).getHours() - 4
                ),
                // x: moment.min(data.map((h) => moment(h.date))).format("DD MMM"),
                // y: null,
              },
              rangeMax: {
                // Format of max zoom range depends on scale type
                x: new Date(date_list[date_list.length - 1]).setDate(
                  new Date(date_list[date_list.length - 1]).getDate()
                ),
                // y: null,
              },

              // // Speed of zoom via mouse wheel
              // // (percentage of zoom on a wheel event)
              // speed: 0.1,

              // // Minimal zoom distance required before actually applying zoom
              // threshold: 2,

              // // On category scale, minimal zoom level before actually applying zoom
              // sensitivity: 3,

              // Function called while the user is zooming
              onZoom: function ({ chart }: { chart: any }) {
                // console.log(`I'm zooming!!!`, chart);
              },
              // // Function called once zooming is completed
              // onZoomComplete: function ({ chart: any }) {
              //   console.log(`I was zoomed!!!`);
              // },
            },
          },
        },
      },
    });
    chart.current = chartInstance;
    return () => {};
  }, []);

  const updateRange = (newRange: {
    from: string;
    to: string;
    range: number;
    data: string[];
  }) => {
    const minTime = newRange.from;
    const maxTime = newRange.to;
    if (chart.current?.options?.scales?.xAxes?.[0].ticks) {
      chart.current.options.scales.xAxes[0].ticks.min = minTime;
      chart.current.options.scales.xAxes[0].ticks.max = maxTime;
      chart.current.update();

      setCurrentVisibleTicks({ from: newRange.from, range: newRange.range });
    }
  };

  const handleBackClick = () => {
    console.log("back currentVisibleTicks", currentVisibleTicks);

    const { from, range } = currentVisibleTicks;
    const positiveRangeFrom = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: from,
      range: range,
    });
    // console.log("positiveRangeFrom", positiveRangeFrom);
    const newRange = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: positiveRangeFrom.from,
      range: -Math.abs(range),
    });
    console.log("newRange", newRange);
    updateRange(newRange);
  };
  const handleForwardClick = () => {
    console.log("forward currentVisibleTicks", currentVisibleTicks);

    const { from, range } = currentVisibleTicks;
    const positiveRangeFrom = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: from,
      range: range,
    });
    console.log("positiveRangeFrom", positiveRangeFrom);
    const newRange = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: positiveRangeFrom.to || positiveRangeFrom.from,
      range: Math.abs(range),
    });

    console.log("newRange", newRange);
    updateRange(newRange);
  };

  const getUniqueVisibleMonth = () => {
    const currentVisibleRange = getDataFromRange({
      data: date_list,
      minVisible: minVisible,
      from: currentVisibleTicks.from,
      range: currentVisibleTicks.range,
    });
    const dates = currentVisibleRange.data;

    const visibleMonths = dates.map((d) => moment(d).format("MMMM"));
    return [...new Set(visibleMonths)];
  };
  return (
      <Box pt={2} pr={2} pb={2} bgcolor="secondary.main" className={classes.container}>
        <Box pl={2} pb={2}>
          <Grid container justify="space-between">
            <Typography variant="subtitle1">
              {getUniqueVisibleMonth().join("-")}
            </Typography>
            <Grid item className="actions">
              <Grid container>
                <IconButton
                  className={classes.btnStyle}
                  onClick={handleBackClick}
                  size="small"
                >
                  <NavigateBeforeRoundedIcon />
                </IconButton>
                <Box m={1} />
                <IconButton
                  className={classes.btnStyle}
                  onClick={handleForwardClick}
                  size="small"
                >
                  <NavigateNextRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          style={{
            cursor: isGrabbed ? "grabbing" : "grab",
          }}
        >
          <canvas id="myChart" ref={canvas} />
        </Box>
      </Box>
  );
};

export default React.memo(Chart, () => true);
