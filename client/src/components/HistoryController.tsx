import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Edit from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Button, TextField, Tooltip, IconButton } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { StateContext } from "../state/StateContext";
import {
  ADD_CASE_TO_HISTORY,
  DELETE_CASE_FROM_HISTORY,
} from "../state/reducers/appReducer";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  hoveredCell: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

export interface HistoryControllerProps {
  socket: any;
}

const HistoryController: React.SFC<HistoryControllerProps> = (props) => {
  const { socket = {} } = props;
  const { zones, selectedZoneId } = useContext(StateContext);
  const selectedZone: any = getSelectedZoneObjById(selectedZoneId, zones);
  const { history = [] } = selectedZone?.properties || {};
  const classes = useStyles();

  const [showColumnAdder, setShowColumnAdder] = useState(false);
  const [showColumnEditor, setShowColumnEditor] = useState("");

  const [selectedInfected, setSelectedInfected] = useState<any>(0);
  const [selectedRecovered, setSelectedRecovered] = useState<any>(0);
  const [selectedDead, setSelectedDead] = useState<any>(0);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [editedInfected, setEditedInfected] = useState<any>(0);
  const [editedRecovered, setEditedRecovered] = useState<any>(0);
  const [editedDead, setEditedDead] = useState<any>(0);
  const [editedDate, setEditedDate] = useState<any>(new Date());

  const [hoveredColumnIndex, setHoveredColumnIndex] = useState<any>(undefined);

  const handleAddCell = () => {
    setShowColumnAdder(true);
  };
  const handleColumnMouseOver = (index: any) => {
    setHoveredColumnIndex(index);
  };
  const handleColumnMouseOut = (index: any) => {
    setHoveredColumnIndex(null);
  };

  const handleSaveAddedCell = () => {
    console.log("selectedDate", selectedDate.toISOString());
    console.log("selectedInfected", selectedInfected);
    socket.emit("add_case_to_history", {
      zoneId: selectedZoneId,
      date: selectedDate.toISOString(),
      infectedNumber: parseInt(selectedInfected, 10),
      recoveredNumber: parseInt(selectedRecovered, 10),
      deadNumber: parseInt(selectedDead, 10),
    });
    socket.once("add_case_to_history_success", () => {
      setSelectedDate(null);
      setSelectedInfected(null);
      setShowColumnAdder(false);
      socket.emit("initial_data");
    });
  };
  const handleCancelAddedCell = () => {
    setShowColumnAdder(false);
  };
  const handleSaveEditedCell = () => {
    socket.emit("edit_case_in_history", {
      historyId: showColumnEditor,
      date: editedDate.toISOString(),
      infectedNumber: parseInt(editedInfected, 10),
      recoveredNumber: parseInt(editedRecovered, 10),
      deadNumber: parseInt(editedDead, 10),
    });
    socket.once("edit_case_in_history_success", () => {
      setShowColumnEditor("");
      socket.emit("initial_data");
    });
  };
  const handleCancelEditedCell = () => {
    setShowColumnAdder(false);
  };

  const handleColumnDelete = (index: any) => {
    console.log("remove clicked");

    socket.emit("remove_case_from_history", {
      zoneId: selectedZoneId,
      historyId: index,
    });
    socket.once("remove_case_from_history_success", () => {
      console.log("removed successfully");
      socket.emit("initial_data");
    });
  };
  const handleColumnEdit = (index: any) => {
    // console.log("index edit", index);
    setShowColumnEditor(index);

    const selectedCase = history.find((h: any) => h._id === index);
    setEditedInfected(selectedCase.infectedNumber);
    setEditedRecovered(selectedCase.recoveredNumber);
    setEditedDead(selectedCase.deadNumber);
  };

  return selectedZoneId ? (
    <>
      Total infected: {selectedZone?.properties?.total?.infectedNumber},<br />
      Total recovered: {selectedZone?.properties?.total?.recoveredNumber},<br />
      Total dead: {selectedZone?.properties?.total?.deadNumber},<br />
      {!showColumnAdder && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleAddCell}>
            Add cell
          </Button>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Controls</TableCell>
              {history.map((row: any, index: number) => (
                <TableCell
                  key={`control-${index}`}
                  className={
                    hoveredColumnIndex === index ? classes.hoveredCell : ""
                  }
                  align="right"
                  onMouseEnter={() => handleColumnMouseOver(index)}
                  onMouseLeave={() => handleColumnMouseOut(index)}
                >
                  {row._id === showColumnEditor ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveEditedCell}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCancelEditedCell}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleColumnEdit(row._id)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleColumnDelete(row._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              ))}
              {showColumnAdder && (
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAddedCell}
                  >
                    Save
                  </Button>
                  <Button variant="contained" onClick={handleCancelAddedCell}>
                    Cancel
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Infected</TableCell>
              {history.map((row: any, index: number) => (
                <TableCell
                  key={`infected-${index}`}
                  align="right"
                  className={
                    hoveredColumnIndex === index ? classes.hoveredCell : ""
                  }
                >
                  {row._id === showColumnEditor ? (
                    <TextField
                      id="standard-number"
                      label="Number"
                      type="number"
                      value={editedInfected}
                      onChange={(e) => {
                        setEditedInfected(e.target.value);
                      }}
                    />
                  ) : (
                    row.infectedNumber
                  )}
                </TableCell>
              ))}
              {showColumnAdder && (
                <TableCell>
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    value={selectedInfected}
                    onChange={(e) => {
                      setSelectedInfected(e.target.value);
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Recovery</TableCell>
              {history.map((row: any, index: number) => (
                <TableCell
                  key={`recovery-${index}`}
                  align="right"
                  className={
                    hoveredColumnIndex === index ? classes.hoveredCell : ""
                  }
                >
                  {row._id === showColumnEditor ? (
                    <TextField
                      id="standard-number"
                      label="Number"
                      type="number"
                      value={editedRecovered}
                      onChange={(e) => {
                        setEditedRecovered(e.target.value);
                      }}
                    />
                  ) : (
                    row.recoveredNumber
                  )}
                </TableCell>
              ))}
              {showColumnAdder && (
                <TableCell>
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    value={selectedRecovered}
                    onChange={(e) => {
                      setSelectedRecovered(e.target.value);
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Death</TableCell>
              {history.map((row: any, index: number) => (
                <TableCell
                  key={`death-${index}`}
                  align="right"
                  className={
                    hoveredColumnIndex === index ? classes.hoveredCell : ""
                  }
                >
                  {row._id === showColumnEditor ? (
                    <TextField
                      id="standard-number"
                      label="Number"
                      type="number"
                      value={editedDead}
                      onChange={(e) => {
                        setEditedDead(e.target.value);
                      }}
                    />
                  ) : (
                    row.deadNumber
                  )}
                </TableCell>
              ))}
              {showColumnAdder && (
                <TableCell>
                  <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    value={selectedDead}
                    onChange={(e) => {
                      setSelectedDead(e.target.value);
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              {history.map((row: any, index: number) => (
                <TableCell
                  key={`date-${index}`}
                  align="right"
                  className={
                    hoveredColumnIndex === index ? classes.hoveredCell : ""
                  }
                >
                  {row._id === showColumnEditor ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker value={editedDate} onChange={setEditedDate} />
                    </MuiPickersUtilsProvider>
                  ) : (
                    moment(new Date(row.date)).format("DD MMM")
                  )}
                </TableCell>
              ))}
              {showColumnAdder && (
                <TableCell>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <></>
  );
};

export default HistoryController;
