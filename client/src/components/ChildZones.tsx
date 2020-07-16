import React, { useState } from "react";
import {
  TableContainer,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
  Box,
  withStyles,
  Button,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import ZoneStatusPin from "./Search/ZoneStatusPin";
import { ZoneStatus } from "../types/zone";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  showMoreBtn: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    padding: "4px 16px",
    boxShadow: "unset !important",
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    paddingLeft: (props: any) => (props.leftMost ? "unset !important" : ""),
    paddingRight: (props: any) => (props.rightMost ? "unset !important" : ""),
  },
})(MuiTableCell);

function createData(name: any, calories: any, fat: any, carbs: any) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  // createData("Gingerbread", 356, 16.0, 49),
];

export interface ChildZonesProps {}

const ChildZones: React.SFC<ChildZonesProps> = () => {
  const classes = useStyles();
  const [numberOfVisibleCells, setNumberOfVisibleCells] = useState(2);
  return (
    <>
      <TableContainer component={Box}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell leftMost>
                <Typography variant="overline">Zone Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="overline">Infected</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="overline">Recovered</Typography>
              </TableCell>
              <TableCell align="center" rightMost>
                <Typography variant="overline">Dead</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              (row, index: number) =>
                index + 1 <= numberOfVisibleCells && (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" leftMost>
                      <Box>
                        <ZoneStatusPin status={ZoneStatus.GREEN} />{" "}
                        <Box component="span" mr={1} />
                        <Link
                          variant="body1"
                          component="button"
                          onClick={() => {
                            console.info("I'm a button.");
                          }}
                        >
                          {row.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center" rightMost>
                      {row.carbs}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Grid container justify="center">
          {rows.length > numberOfVisibleCells && (
            <Button
              className={classes.showMoreBtn}
              variant="contained"
              color="primary"
              startIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={() => {
                setNumberOfVisibleCells(numberOfVisibleCells + 2);
              }}
            >
              See more
            </Button>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ChildZones;
