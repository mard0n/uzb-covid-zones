import React from "react";
import {
  Paper,
  useTheme,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useStyles as useCallBannerStyles } from "./CallBanner";
import VirusBig from "../../assets/images/virus-big.svg";
import Hand from "../../assets/images/hand.svg";
import { useTranslation } from "react-i18next";

export interface WelcomeBannerProps {}

const useStyles = makeStyles({
  papar: {
    position: "relative",
    padding: "24px",
    overflow: "hidden",
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
  const { t } = useTranslation();
  return (
    <Paper
      className={`${callBannerClasses.paper} ${classes.papar}`}
      elevation={0}
    >
      <img style={backgroundVirusImg} src={VirusBig} alt="virus image" />
      <Grid item xs={12} sm={10} md={8}>
        <Box height="49px" mb={1}>
          <img src={Hand} alt="Hi" />
        </Box>
        <Typography variant="subtitle1">{t("welcomeBanner.title")}</Typography>
        <Typography variant="caption" className={classes.caption}>
          {t("welcomeBanner.subtitle")}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default WelcomeBanner;
