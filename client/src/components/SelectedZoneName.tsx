import React from "react";
import { Alert } from "@material-ui/lab";
import { Typography, makeStyles, useTheme, Grid } from "@material-ui/core";
import { ZoneStatus } from "../types/zone";

export interface SelectedZoneNameProps {
  zoneName: string;
  zoneStatus: ZoneStatus;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: "36px",
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
  const getAlertStatus = () => {
    const status: {
      alertStatus: "success" | "warning" | "error";
      alertText: string;
    } = {
      alertStatus: "success",
      alertText: "",
    };
    switch (zoneStatus) {
      case ZoneStatus.RED:
        status["alertStatus"] = "error";
        status["alertText"] = "Dangerous";
        break;
      case ZoneStatus.YELLOW:
        status["alertStatus"] = "warning";
        status["alertText"] = "Warning";
        break;
      case ZoneStatus.GREEN:
        status["alertStatus"] = "success";
        status["alertText"] = "Safe";
        break;
      default:
        break;
    }
    return status;
  };

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
        {getAlertStatus().alertText && (
          <Alert
            classes={{
              root: classes.root,
              icon: classes.icon,
              message: classes.message,
            }}
            icon={() => {}}
            severity={getAlertStatus().alertStatus}
          >
            {getAlertStatus().alertText}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectedZoneName;
