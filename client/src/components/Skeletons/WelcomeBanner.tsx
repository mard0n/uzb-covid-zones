import * as React from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

export interface WelcomeBannerProps {}

const useStyles = makeStyles({
  root: {
    borderRadius: 24,
    backgroundColor: "#ebebebc7",
    height: "auto",
    padding: 24,
  },
  withChildren: {
    "& > *": {
      visibility: "visible",
      zIndex: 1000,
      position: 'relative'
    },
  },
  wave: {
    "&::after": {
      zIndex: 500,
    },
  },
});

const WelcomeBanner: React.SFC<WelcomeBannerProps> = () => {
  const classes = useStyles();

  return (
    <Skeleton
      classes={{
        root: classes.root,
        withChildren: classes.withChildren,
        wave: classes.wave,
      }}
      animation="wave"
      variant="rect"
      width="100%"
    >
      <div
        style={{
          height: "49px",
          width: "49px",
          borderRadius: "25px",
          marginBottom: "8px",
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          width: "45%",
          height: "18px",
          borderRadius: "4px",
          margin: "7px 0",
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          width: "90%",
          height: " 14px",
          borderRadius: "4px",
          margin: " 10px 0",
          backgroundColor: " white",
        }}
      />
      <div
        style={{
          width: "90%",
          height: " 14px",
          borderRadius: "4px",
          margin: " 10px 0",
          backgroundColor: " white",
        }}
      />
      <div
        style={{
          width: "70%",
          height: " 14px",
          borderRadius: "4px",
          margin: " 10px 0",
          backgroundColor: " white",
        }}
      />
    </Skeleton>
  );
};

export default WelcomeBanner;
