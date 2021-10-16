import React, { useState, useContext } from "react";
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
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { StateContext } from "../../state/StateContext";
import { getProperDisplayName } from "../../utils/getProperDisplayName";
import { getChildZones } from "../../utils/getChildZones";
import { ADD_SELECTED_ZONE_ID } from "../../state/reducers/appReducer";
import ChildZonesSkeleton from "../Skeletons/ChildZones";

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
  skeleton: {
    display: "inline-block",
    backgroundColor: "rgb(245, 247, 253)",
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

export interface ChildZonesProps {}

const ChildZones: React.SFC<ChildZonesProps> = () => {
  const { zones, selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const classes = useStyles();
  const [numberOfVisibleCells, setNumberOfVisibleCells] = useState(4);
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const defaultZone = zones.find(
    (zone) => zone?.properties?.alias?.indexOf("Uzbekistan") > -1
  );

  const childZones = getChildZones(
    selectedZone
      ? selectedZone?.properties?.childZones
      : defaultZone?.properties?.childZones,
    zones
  );
  return childZones.length ? (
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
              <TableCell
                leftmost={"true"}
                style={{ maxWidth: "25vw", paddingTop: 0 }}
              >
                <Typography variant="caption" className={classes.tableCellText}>
                  {t("childZonesTable.zoneName")}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ paddingTop: 0 }}>
                <Typography variant="caption" className={classes.tableCellText}>
                  {t("dataType.infected")}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ paddingTop: 0 }}>
                <Typography variant="caption" className={classes.tableCellText}>
                  {t("dataType.recovered")}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ paddingTop: 0 }}
                rightmost={"true"}
              >
                <Typography variant="caption" className={classes.tableCellText}>
                  {t("dataType.dead")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {childZones.map(
              (zone, index: number) =>
                index + 1 <= numberOfVisibleCells && (
                  <TableRow key={zone._id}>
                    <TableCell component="th" scope="row" leftmost={"true"}>
                      <Box>
                        {mdUp && (
                          <ZoneStatusPin status={zone.properties?.status} />
                        )}
                        {mdUp && <Box component="span" mr={1} />}
                        <Link
                          variant="body1"
                          component="button"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "25vw",
                            whiteSpace: "nowrap",
                            textIndent: mdUp ? 0 : 1,
                          }}
                          onClick={() => {
                            dispatch({
                              type: ADD_SELECTED_ZONE_ID,
                              payload: zone._id,
                            });
                          }}
                        >
                          {getProperDisplayName(zone)}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {zone?.properties?.total?.infectedNumber}
                    </TableCell>
                    <TableCell align="center">
                      {zone?.properties?.total?.recoveredNumber}
                    </TableCell>
                    <TableCell align="center" rightmost={"true"}>
                      {zone?.properties?.total?.deadNumber}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {childZones.length > numberOfVisibleCells && (
        <Box mt={2}>
          <Grid container justify="center">
            <Button
              className={classes.showMoreBtn}
              variant="contained"
              color="primary"
              startIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={() => {
                setNumberOfVisibleCells(childZones.length);
              }}
            >
              {t("childZonesTable.seeMore")}
            </Button>
          </Grid>
        </Box>
      )}
    </Box>
  ) : !selectedZone ? (
    <ChildZonesSkeleton mdUp={mdUp} />
  ) : (
    <></>
  );
};

export default ChildZones;
