import React from "react";
import { Alert } from "@material-ui/lab";
import { Typography, makeStyles, useTheme, Grid, Box } from "@material-ui/core";
import { ZoneStatus } from "../types/zone";
import getZoneStatusColor from "../utils/getZoneStatusColor";

export interface SelectedZoneNameProps {
  zoneName: string;
  zoneStatus: ZoneStatus;
}

const useStyles = makeStyles((theme) => ({
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
  message: {
    padding: 0,
  },
}));

const SelectedZoneName: React.SFC<SelectedZoneNameProps> = (props) => {
  const { zoneName, zoneStatus } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const status = getZoneStatusColor(zoneStatus);

  return (
    <Grid
      container
      justify="space-between"
      alignItems={"center"}
      wrap={"wrap-reverse"}
      spacing={1}
    >
      <Grid item>
        {zoneName && <Typography variant="h1">{zoneName}</Typography>}
      </Grid>
      <Grid item>
        {status.text && (
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
        )}
      </Grid>
    </Grid>
  );
};

export default SelectedZoneName;
