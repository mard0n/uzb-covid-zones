import React from "react";
import { Skeleton } from "@material-ui/lab";

export interface CallBannerProps {}

const CallBanner: React.SFC<CallBannerProps> = () => {
  const styleSkeleton = {
    padding: "16px",
    display: 'flex',
    borderRadius: 18,
    backgroundColor: "#ebebebc7",
  };
  return (
    <Skeleton
      style={styleSkeleton}
      animation="wave"
      variant="rect"
      width="100%"
    >
      <div
        style={{
          height: 60,
          width: 60,
          marginRight: 16,
          backgroundColor: "white",
        }}
      />
      <div style={{width: '100%'}}>
        <div
          style={{
            width: "80%",
            height: 18,
            marginTop: 3,
            marginBottom: 3,
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            width: "100%",
            height: 16,
            marginTop: 4,
            marginBottom: 4,
            backgroundColor: "white",
          }}
        />
      </div>
    </Skeleton>
  );
};

export default CallBanner;
