import React, { useContext } from "react";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { StateContext } from "../../state/StateContext";
import Chart from "./Chart";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export interface GraphProps {}

const Graph: React.SFC<GraphProps> = () => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const { t } = useTranslation()

  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);
  const { history = [] } = selectedZone?.properties || {};
  return (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">{t('history.title')}</Typography>
      </Box>
      <Chart data={history} minVisible={8} />
    </Box>
  );
};

export default Graph;
