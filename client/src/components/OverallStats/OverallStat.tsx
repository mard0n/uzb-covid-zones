import React, { useContext } from "react";
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
import getZoneStatusProps from "../../utils/getZoneStatusProps";
import { ZoneStatus } from "../../types/zone";
import OverallStatPaper, { OverallStatPaperPosition } from "./OverallStatPaper";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { useTranslation } from "react-i18next";

export interface OverallStatProps {}

const OverallStat: React.SFC<OverallStatProps> = (props) => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const { t } = useTranslation()
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const totalInfected = selectedZone?.properties?.total.infectedNumber;
  const totalRecovered = selectedZone?.properties?.total.recoveredNumber;
  const totalDead = selectedZone?.properties?.total.deadNumber;

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const infectedColor = getZoneStatusProps(ZoneStatus.RISKY)?.textInBlueishBg;
  const recoveredColor = getZoneStatusProps(ZoneStatus.SAFE)?.textInBlueishBg;
  const deadColor = getZoneStatusProps(ZoneStatus.DANGEROUS)?.textInBlueishBg;

  const [preLastHistory, lastHistory] = selectedZone?.properties?.history?.slice(-2) || [];
  const infectedPercentOfIncrease = ((lastHistory?.infectedNumber / preLastHistory?.infectedNumber) * 100) - 100
  const recoveredPercentOfIncrease = ((lastHistory?.recoveredNumber / preLastHistory?.recoveredNumber) * 100) - 100
  const deadPercentOfIncrease = ((lastHistory?.deadNumber / preLastHistory?.deadNumber) * 100) - 100

  return (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">{t('overallStats.title')}</Typography>
      </Box>
      <Grid container spacing={mdUp ? 2 : 0}>
        <Grid item xs style={{transition: 'all .4s linear 0s'}}>
          <OverallStatPaper
            title={t('dataType.infected')}
            number={totalInfected}
            caption={infectedPercentOfIncrease}
            numberColor={infectedColor}
            position={OverallStatPaperPosition.LEFT}
          />
        </Grid>
        <Grid item xs style={{transition: 'all .4s linear 0s'}}>
          <OverallStatPaper
            title={t('dataType.recovered')}
            number={totalRecovered}
            caption={recoveredPercentOfIncrease}
            numberColor={recoveredColor}
            position={OverallStatPaperPosition.MIDDLE}
          />
        </Grid>
        <Grid item xs style={{transition: 'all .4s linear 0s'}}>
          <OverallStatPaper
            title={t('dataType.dead')}
            number={totalDead}
            caption={deadPercentOfIncrease}
            numberColor={deadColor}
            position={OverallStatPaperPosition.RIGHT}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverallStat;
