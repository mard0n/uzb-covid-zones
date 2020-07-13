import React, { useContext } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { StateContext } from "../state/StateContext";
import Chart from "./Chart";
import { Box, Typography } from "@material-ui/core";

export interface GraphProps {}

const Graph: React.SFC<GraphProps> = () => {
  const { zones, selectedZoneId } = useContext(StateContext);
  console.log("graph zones", zones);

  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);
  const { history = [] } = selectedZone?.properties || {};
  console.log("history", history);
  return history && history.length > 0 ? (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">Statistics</Typography>
      </Box>
      <Chart data={history} minVisible={5} />
    </Box>
  ) : (
    // <ResponsiveContainer width="100%" height="100%">
    //   <LineChart
    //     width={500}
    //     height={250}
    //     data={history.slice()}
    //     margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis
    //       orientation="top"
    //       // type="number"
    //       axisLine={false}
    //       dataKey="date"
    //       padding={{ left: 30, right: 30 }}
    //       tickFormatter={(timeStr) =>
    //         moment(new Date(timeStr)).format("DD MMM")
    //       }
    //     />
    //     <YAxis
    //     // domain={[
    //     //   0,
    //     //   (dataMax) => {
    //     //     const maxValue = Math.max(
    //     //       ...zones
    //     //         .map((zone: any) => zone.properties?.infection?.history)
    //     //         .flat()
    //     //         .map((history: any) => history.amount)
    //     //     );
    //     //     console.log("maxValue", maxValue);

    //     //     return maxValue;
    //     //   },
    //     // ]}
    //     />
    //     <YAxis />
    //     <Tooltip
    //       labelFormatter={(timeStr) =>
    //         moment(new Date(timeStr)).format("DD MMM")
    //       }
    //       formatter={(value, name, props) => {
    //         return [value, name];
    //       }}
    //     />
    //     {/* <Legend /> */}
    //     <Line
    //       type="monotone"
    //       dataKey="infectedNumber"
    //       stroke="#8884d8"
    //       activeDot={{ r: 8 }}
    //     />
    //     <Line
    //       type="monotone"
    //       dataKey="recoveredNumber"
    //       stroke="#41b53f"
    //       activeDot={{ r: 8 }}
    //     />
    //     <Line
    //       type="monotone"
    //       dataKey="deadNumber"
    //       stroke="#d34242"
    //       activeDot={{ r: 8 }}
    //     />
    //   </LineChart>
    // </ResponsiveContainer>
    <></>
  );
};

export default Graph;
