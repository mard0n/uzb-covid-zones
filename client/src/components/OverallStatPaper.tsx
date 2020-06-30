import React from "react";
import {
  Paper,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
  createStyles,
  Divider,
  Grid,
} from "@material-ui/core";

export enum OverallStatPaperPosition {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  MIDDLE = "MIDDLE",
}

export interface OverallStatPaperProps {
  title: string;
  number: number;
  caption: string;
  numberColor: string;
  position: OverallStatPaperPosition;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: (props: OverallStatPaperProps) => ({
      padding: 15,
      textAlign: "center",
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.up("md")]: {
        // Web
        borderRadius: 9,
      },
      [theme.breakpoints.down("sm")]: {
        // Mobile
        borderTopLeftRadius:
          props.position === OverallStatPaperPosition.LEFT ? 9 : 0,
        borderTopRightRadius:
          props.position === OverallStatPaperPosition.RIGHT ? 9 : 0,
        borderBottomLeftRadius:
          props.position === OverallStatPaperPosition.LEFT ? 9 : 0,
        borderBottomRightRadius:
          props.position === OverallStatPaperPosition.RIGHT ? 9 : 0,
        paddingLeft:
          props.position === OverallStatPaperPosition.MIDDLE ? 0 : 15,
        paddingRight:
          props.position === OverallStatPaperPosition.MIDDLE ? 0 : 15,
      },
    }),
    paperTitle: {
      fontWeight: 500,
      color: theme.palette.secondary.contrastText,
    },
    paperNumber: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    paperCaption: {
      color: "#777FA9",
    },
  })
);

const OverallStatPaper: React.SFC<OverallStatPaperProps> = (props) => {
  const { title, number, caption, numberColor, position } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const classes = useStyles(props);
  return (
    <Paper className={classes.paper} color="secondary" elevation={0}>
      <Grid container justify="space-between" alignItems="stretch">
        {position === OverallStatPaperPosition.MIDDLE && !mdUp && (
          <Divider orientation="vertical" flexItem />
        )}
        <Grid item style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Typography variant="caption" className={classes.paperTitle}>
            {title}
          </Typography>
          <Typography
            variant="h1"
            className={classes.paperNumber}
            style={{ color: numberColor }}
          >
            {number}
          </Typography>
          <Typography variant="caption" className={classes.paperCaption}>
            {caption}
          </Typography>
        </Grid>
        {position === OverallStatPaperPosition.MIDDLE && !mdUp && (
          <Divider orientation="vertical" flexItem />
        )}
      </Grid>
    </Paper>
  );
};

export default OverallStatPaper;
