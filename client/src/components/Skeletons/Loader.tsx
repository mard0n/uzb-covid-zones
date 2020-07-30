import React from "react";
import "./loaderStyle.css";
import Search from "./Search";
import SuggestedZones from "./SuggestedZones";
import WelcomeBanner from "./WelcomeBanner";
import ChildZones from "./ChildZones";
import CallBanner from "./CallBanner";
import { useMediaQuery, Theme } from "@material-ui/core";

export interface LoaderProps {}

const Loader: React.SFC<LoaderProps> = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <div className="loader-container">
      <div className="loader-mobile">
        <div className="search-container">
          <Search mdUp={mdUp} />
          <SuggestedZones mdUp={mdUp} />
        </div>
        <div className="main-container">
          <div className="notch" />
          <WelcomeBanner />
        </div>
      </div>
      <div className="loader-web">
        <div className="main-container" style={{ overflow: "hidden" }}>
          <Search mdUp={mdUp} />
          <SuggestedZones mdUp={mdUp} />
          <div style={{ marginBottom: 24 }}></div>
          <WelcomeBanner />
          <div style={{ marginBottom: 32 }}></div>
          <ChildZones mdUp={mdUp} />
          <CallBanner />
        </div>
      </div>
    </div>
  );
};

export default Loader;
