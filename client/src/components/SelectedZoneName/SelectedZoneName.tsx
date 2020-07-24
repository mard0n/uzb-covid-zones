import React, { useContext } from "react";
import { Typography, makeStyles, useTheme, Grid, Box } from "@material-ui/core";
import getZoneStatusColor from "../../utils/getZoneStatusColor";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { getParents } from "../../utils/getParents";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export interface SelectedZoneNameProps {}

const useStyles = makeStyles((theme) => ({
  zoneName: {
    marginBottom: '4px'
  },
  badge: {
    display: "inline-block",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 5,
  },
  badgeText: {
    fontWeight: 500,
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  parentZones: {
    verticalAlign: 'top'
  },
  message: {
    padding: 0,
  },
}));

const SelectedZoneName: React.SFC<SelectedZoneNameProps> = (props) => {
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const zoneName = selectedZone?.properties.displayName;
  const zoneStatus = selectedZone?.properties.status;

  const theme = useTheme();
  const classes = useStyles(theme);
  const status = zoneStatus && getZoneStatusColor(zoneStatus);

  return (
    <Grid
      container
      justify="space-between"
      wrap={"wrap-reverse"}
      spacing={1}
    >
      {zoneName && (
        <Grid item>
          <Typography className={classes.zoneName} variant="h1">{zoneName}</Typography>
          {selectedZone && (
            <>
              <LocationOnIcon fontSize="small" color={"disabled"} />
              <Box mr={1} component='span'/>
              <Typography className={classes.parentZones} variant="caption">
                {getParents(selectedZone, zones)}
              </Typography>
            </>
          )}
        </Grid>
      )}
      {status?.text && (
        <Grid item>
          <Box
            className={classes.badge}
            style={{
              color: status.textInBlueishBg,
              backgroundColor: status.bgColor,
            }}
          >
            <Typography variant="caption" className={classes.badgeText}>
              {status.text}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default SelectedZoneName;
