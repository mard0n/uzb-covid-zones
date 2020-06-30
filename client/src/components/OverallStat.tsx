import React from "react";
import {
  Typography,
  Paper,
  useTheme,
  Grid,
  makeStyles,
  Box,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
import { center } from "@turf/turf";
import getZoneStatusColor from "../utils/getZoneStatusColor";
import { ZoneStatus } from "../types/zone";
import OverallStatPaper, { OverallStatPaperPosition } from "./OverallStatPaper";

export interface OverallStatProps {
  totalInfected: number;
  totalRecovered: number;
  totalDead: number;
}

const OverallStat: React.SFC<OverallStatProps> = (props) => {
  const { totalInfected = 0, totalRecovered = 0, totalDead = 0 } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const infectedColor = getZoneStatusColor(ZoneStatus.YELLOW)?.textInBlueishBg;
  const recoveredColor = getZoneStatusColor(ZoneStatus.GREEN)?.textInBlueishBg;
  const deadColor = getZoneStatusColor(ZoneStatus.RED)?.textInBlueishBg;

  return (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">Up to today</Typography>
      </Box>
      <Grid container spacing={mdUp ? 2 : 0}>
        <Grid item xs>
          <OverallStatPaper
            title={"Infected"}
            number={totalInfected}
            caption={"12%"}
            numberColor={infectedColor}
            position={OverallStatPaperPosition.LEFT}
          />
          {/* <Paper className={classes.paper} color="secondary" elevation={0}>
            <Typography variant="caption" className={classes.paperTitle}>
              Infected
            </Typography>
            <Typography
              variant="h1"
              className={classes.paperNumber}
              style={{ color: infectedColor }}
            >
              {totalInfected}
            </Typography>
            <Typography variant="caption" className={classes.paperCaption}>
              12%
            </Typography>
          </Paper> */}
        </Grid>
        <Grid item xs>
          <OverallStatPaper
            title={"Recovered"}
            number={totalRecovered}
            caption={"11%"}
            numberColor={recoveredColor}
            position={OverallStatPaperPosition.MIDDLE}
          />
          {/* <Paper className={classes.paper} color="secondary" elevation={0}>
            <Typography variant="caption" className={classes.paperTitle}>
              Recovered
            </Typography>
            <Typography
              variant="h1"
              className={classes.paperNumber}
              style={{ color: recoveredColor }}
            >
              {totalRecovered}
            </Typography>
            <Typography variant="caption" className={classes.paperCaption}>
              11%
            </Typography>
          </Paper> */}
        </Grid>
        <Grid item xs>
          <OverallStatPaper
            title={"Dead"}
            number={totalDead}
            caption={"5%"}
            numberColor={deadColor}
            position={OverallStatPaperPosition.RIGHT}
          />
          {/* <Paper className={classes.paper} color="secondary" elevation={0}>
            <Typography variant="caption" className={classes.paperTitle}>
              Dead
            </Typography>
            <Typography
              variant="h1"
              className={classes.paperNumber}
              style={{ color: deadColor }}
            >
              {totalDead}
            </Typography>
            <Typography variant="caption" className={classes.paperCaption}>
              5%
            </Typography>
          </Paper> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallStat;
