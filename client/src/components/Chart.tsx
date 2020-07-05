import React, { useEffect, useRef, useState } from "react";
import ChartLib from "chart.js";
import { History, ZoneStatus } from "../types/zone";
import moment, { min } from "moment";
import getZoneStatusColor from "../utils/getZoneStatusColor";
import { getDataFromRange, getRangeFromData } from "../utils/getDataFromRange";

export interface ChartProps {
  data: History[];
  minVisible?: number;
}

const Chart: React.SFC<ChartProps> = (props) => {
  const { data, minVisible = 9 } = props;
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [currentVisibleTicks, setCurrentVisibleTicks] = useState({
    from: "2019-08-30",
    range: -9,
  });
  const canvas = useRef<any>();
  const chart = useRef<Chart>();
  let date_list = [
    "2019-08-01",
    "2019-08-02",
    "2019-08-03",
    "2019-08-04",
    "2019-08-05",
    "2019-08-06",
    "2019-08-07",
    "2019-08-08",
    "2019-08-09",
    "2019-08-10",
    "2019-08-11",
    "2019-08-12",
    "2019-08-13",
    "2019-08-14",
    "2019-08-15",
    "2019-08-16",
    "2019-08-17",
    "2019-08-18",
    "2019-08-19",
    "2019-08-20",
    "2019-08-21",
    "2019-08-22",
    "2019-08-23",
    "2019-08-24",
    "2019-08-25",
    "2019-08-26",
    "2019-08-27",
    "2019-08-28",
    "2019-08-29",
    "2019-08-30",
  ];
  console.log("currentVisibleTicks", currentVisibleTicks);

  useEffect(() => {
    const dataFromRange = getDataFromRange(
      currentVisibleTicks.from,
      currentVisibleTicks.range,
      date_list
    );
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
            // data: [...data.map((h) => h.infectedNumber)],
            data: [
              12,
              19,
              3,
              5,
              2,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
              12,
              19,
              3,
              5,
              2,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
              2,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
            ],
          },
          {
            label: "recovered",
            borderColor: getZoneStatusColor(ZoneStatus.GREEN).textInBlueishBg,
            // data: [...data.map((h) => h.infectedNumber)],
            data: [
              12,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
              2,
              3,
              2,
              19,
              3,
              5,
              2,
              3,
              5,
              2,
              16,
              23,
              11,
              44,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
              12,
              19,
              22,
            ],
          },
          {
            label: "dead",
            borderColor: getZoneStatusColor(ZoneStatus.RED).textInBlueishBg,
            // data: [...data.map((h) => h.infectedNumber)],
            data: [
              12,
              19,
              3,
              5,
              2,
              16,
              23,
              11,
              44,
              2,
              3,
              11,
              44,
              22,
              3,
              2,
              16,
              23,
              11,
              44,
              22,
              2,
              12,
              19,
              3,
              5,
              2,
              3,
              2,
              16,
              23,
              22,
            ],
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
        scales: {
          xAxes: [
            {
              position: "top",
              type: "time",
              time: {
                // parser: "DD MMM",
                // tooltipFormat: "DD MMM",
                min: dataFromRange[0],
                max: dataFromRange[dataFromRange.length - 1],
                unit: "day",
                minUnit: "day",
              },
              ticks: {
                padding: 24,
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
          // min: moment.min(data.map((h) => moment(h.date))).format('DD MMM'),
          // max: moment.max(data.map((h) => moment(h.date))).format('DD MMM')
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
                setCurrentVisibleTicks({ from, range });
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

  const handleBackClick = () => {
    const { from, range } = currentVisibleTicks;
    const positiveRangeFrom = getDataFromRange(from, range, date_list);
    console.log("positiveRangeFrom", positiveRangeFrom);
    const minTime = getDataFromRange(
      positiveRangeFrom[0],
      -Math.abs(range),
      date_list
    )[0];
    const maxTime = positiveRangeFrom[0];

    if (chart.current?.options?.scales?.xAxes?.[0].time) {
      console.log("minTime", minTime);
      console.log("maxTime", maxTime);
      chart.current.options.scales.xAxes[0].time.min = minTime;
      chart.current.options.scales.xAxes[0].time.max = maxTime;
      chart.current.update();
      const { from, range } = getRangeFromData(
        minTime,
        maxTime,
        date_list,
        minVisible
      );
      setCurrentVisibleTicks({ from, range });
      console.log("updated, from, range", from, range);
    }
  };
  const handleForwardClick = () => {};
  return (
    <>
      <button onClick={handleBackClick}>{"<---"}</button>
      <button onClick={handleForwardClick}>{"--->"}</button>
      <div
        style={{
          cursor: isGrabbed ? "grabbing" : "grab",
        }}
      >
        <canvas id="myChart" ref={canvas} width="600px" height="400" />
      </div>
    </>
  );
};

export default React.memo(Chart, () => true);
