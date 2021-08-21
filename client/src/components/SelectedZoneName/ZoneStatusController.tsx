import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { StateContext } from "../../state/StateContext";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { ZoneStatus } from "types/zone";

export interface ZoneStatusControllerProps {
  socket: any;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ZoneStatusController: React.SFC<ZoneStatusControllerProps> = (props) => {
  const { socket } = props;
  const classes = useStyles();
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);

  const handleZoneStatusChange = (event: any) => {
    socket.emit("change_zone_status", {
      zoneId: selectedZoneId,
      status: event.target.value,
    });
    socket.once("change_zone_status_success", () => {
      socket.emit("initial_data");
    });
  };
  return selectedZone ? (
    <>
      <h2>
        Status:{" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Zone Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedZone?.properties?.status}
            onChange={handleZoneStatusChange}
          >
            <MenuItem value={ZoneStatus.DANGEROUS}>Red</MenuItem>
            <MenuItem value={ZoneStatus.RISKY}>Yellow</MenuItem>
            <MenuItem value={ZoneStatus.SAFE}>Green</MenuItem>
          </Select>
        </FormControl>
      </h2>
    </>
  ) : (
    <></>
  );
};

export default ZoneStatusController;
