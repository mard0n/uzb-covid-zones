import React from "react";
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  Theme,
  useTheme,
  createStyles,
  Box,
} from "@material-ui/core";
import VirusSmall from "../../assets/images/virus-small.svg";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";

export interface CallBannerProps {}

export const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      padding: 16,
      borderRadius: 9,
    },
    flex: {
      display: "flex",
    },
    textMain: {},
    textSecondary: {
      opacity: "50%",
      fontWeight: 400,
    },
  })
);

const CallBanner: React.SFC<CallBannerProps> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleClick = () => {
    window.open("tel:+1303499-7111", "_blank");
  };
  return (
    <Box mt={4} mb={4}>
      <Paper
        className={classes.paper}
        style={{ cursor: "pointer" }}
        elevation={0}
        onClick={() => handleClick()}
      >
        <Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <Grid className={classes.flex} container item alignItems="center" wrap="nowrap">
            <img src={VirusSmall} />
            <Box mr={2} />
            <Grid item container direction="column" wrap="nowrap">
              <Typography>Feel Covid-19 Symptoms?</Typography>
              <Typography className={classes.textSecondary}>
                Call Covid-19 online support
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ChevronRightRoundedIcon />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CallBanner;
