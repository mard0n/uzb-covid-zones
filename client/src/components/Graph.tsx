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
  return (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">Statistics</Typography>
      </Box>
      <Chart data={history} minVisible={5} />
    </Box>
  );
};

export default Graph;
