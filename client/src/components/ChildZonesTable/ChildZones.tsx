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
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import ZoneStatusPin from "../Search/ZoneStatusPin";
import { ZoneStatus } from "../../types/zone";
import { useTranslation } from "react-i18next";

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
  tableCellText: {
    lineHeight: 1,
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    lineHeight: 1.2,
    paddingLeft: (props: { leftmost?: string; rightmost?: string }) =>
      props.leftmost ? "unset !important" : "8px",
    paddingRight: (props: { leftmost?: string; rightmost?: string }) =>
      props.rightmost ? "unset !important" : "8px",
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
  const { t } = useTranslation();
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <Box mt={4} mb={4}>
      <Box mb={1}>
        <Typography variant="subtitle1">
          {t("childZonesTable.title")}
        </Typography>
      </Box>
      <TableContainer component={Box}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell leftmost={"true"} style={{ maxWidth: "25vw" }}>
                <Typography
                  variant="overline"
                  className={classes.tableCellText}
                >
                  {t("childZonesTable.zoneName")}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="overline"
                  className={classes.tableCellText}
                >
                  {t("dataType.infected")}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="overline"
                  className={classes.tableCellText}
                >
                  {t("dataType.recovered")}
                </Typography>
              </TableCell>
              <TableCell align="center" rightmost={"true"}>
                <Typography
                  variant="overline"
                  className={classes.tableCellText}
                >
                  {t("dataType.dead")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              (row, index: number) =>
                index + 1 <= numberOfVisibleCells && (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" leftmost={"true"}>
                      <Box>
                        {smUp && <ZoneStatusPin status={ZoneStatus.GREEN} />}
                        {smUp && <Box component="span" mr={1} />}
                        <Link
                          variant="body1"
                          component="button"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "25vw",
                            whiteSpace: "nowrap",
                          }}
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
                    <TableCell align="center" rightmost={"true"}>
                      {row.carbs}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > numberOfVisibleCells && (
        <Box mt={2}>
          <Grid container justify="center">
            <Button
              className={classes.showMoreBtn}
              variant="contained"
              color="primary"
              startIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={() => {
                setNumberOfVisibleCells(numberOfVisibleCells + 2);
              }}
            >
              {t('childZonesTable.seeMore')}
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ChildZones;
