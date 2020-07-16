import React from "react";
import {
  Paper,
  useTheme,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useStyles as useCallBannerStyles } from "./CallBanner";
import VirusBig from "../assets/images/virus-big.svg";
import Hand from "../assets/images/hand.svg";

export interface WelcomeBannerProps {}

const useStyles = makeStyles({
  papar: {
    position: "relative",
    padding: '24px',
    overflow: 'hidden'
  },
  caption: {
    opacity: "85%",
  },
});
const backgroundVirusImg: any = {
  position: "absolute",
  top: "-40px",
  right: "0px",
};

const WelcomeBanner: React.SFC<WelcomeBannerProps> = () => {
  const theme = useTheme();
  const callBannerClasses = useCallBannerStyles(theme);
  const classes = useStyles();
  return (
    <Paper
      className={`${callBannerClasses.paper} ${classes.papar}`}
      elevation={0}
    >
      <img style={backgroundVirusImg} src={VirusBig} alt="virus image" />
      <Grid xs={12} sm={10} md={8}>
        <img src={Hand} alt="Hand" />
        <Typography variant="subtitle1">Welcome to UzCovid</Typography>
        <Typography variant="caption" className={classes.caption}>
          Service for Uzbek people to monitor Covid-19 spread in the country. To
          start, put desired town, city, area in the search bar.
        </Typography>
      </Grid>
    </Paper>
  );
};

export default WelcomeBanner;
