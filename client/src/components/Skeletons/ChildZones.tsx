import * as React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
  withStyles,
} from "@material-ui/core";

export interface ChildZonesProps {
  mdUp: boolean;
}

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const ChildZones: React.SFC<ChildZonesProps> = () => {
  const styleSkeleton = {
    borderRadius: " 4px",
    backgroundColor: "#ebebebc7",
    transform: "unset",
  };
  return (
    <div style={{ marginBottom: 32, marginTop: 32 }}>
      <div style={{ marginBottom: 16 }}>
        <Skeleton
          style={{ ...styleSkeleton, borderRadius: 16 }}
          animation="wave"
          variant="text"
          width="150px"
          height="32px"
        />
      </div>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ maxWidth: "25vw", paddingTop: 0, paddingLeft: 0 }}
              >
                <Skeleton
                  style={styleSkeleton}
                  animation="wave"
                  variant="text"
                  width="100%"
                />
              </TableCell>
              <TableCell align="center" style={{ paddingTop: 0 }}>
                <Skeleton
                  style={styleSkeleton}
                  animation="wave"
                  variant="text"
                  width="100%"
                />
              </TableCell>
              <TableCell align="center" style={{ paddingTop: 0 }}>
                <Skeleton
                  style={styleSkeleton}
                  animation="wave"
                  variant="text"
                  width="100%"
                />
              </TableCell>
              <TableCell
                align="center"
                style={{ paddingTop: 0, paddingRight: 0 }}
              >
                <Skeleton
                  style={styleSkeleton}
                  animation="wave"
                  variant="text"
                  width="100%"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((zone, index: number) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: 0 }}
                >
                  <Skeleton
                    style={styleSkeleton}
                    animation="wave"
                    variant="text"
                    width="100%"
                  />
                </TableCell>
                <TableCell align="center">
                  <Skeleton
                    style={styleSkeleton}
                    animation="wave"
                    variant="text"
                    width="100%"
                  />
                </TableCell>
                <TableCell align="center">
                  <Skeleton
                    style={styleSkeleton}
                    animation="wave"
                    variant="text"
                    width="100%"
                  />
                </TableCell>
                <TableCell align="center" style={{ paddingRight: 0 }}>
                  <Skeleton
                    style={styleSkeleton}
                    animation="wave"
                    variant="text"
                    width="100%"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "16px" }}>
        <Skeleton
          animation="wave"
          variant="rect"
          width="150px"
          height="32px"
          style={{
            display: "block",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "16px",
            backgroundColor: "#ebebebc7",
          }}
        />
      </div>
    </div>
  );
};

export default ChildZones;
