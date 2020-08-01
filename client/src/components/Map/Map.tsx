import React, { useContext, useRef } from "react";
import Leaflet from "./Leaflet";
import { StateContext } from "state/StateContext";
import { getSelectedZoneObjById } from "utils/getSelectedZoneObj";
import { useTranslation } from "react-i18next";
import { useMediaQuery, Theme } from "@material-ui/core";
import {
  ADD_SELECTED_ZONE_ID,
  ADD_NAVIGATE_TO_FN,
} from "state/reducers/appReducer";
import { Zone } from "types/zone";

export interface MapProps {}

const Map: React.SFC<MapProps> = () => {
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const handleZoneSelect = (feature: Zone) => {
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: feature._id,
    });
    // closeBottomSheet();
  };

  const navigateToRef = (navigateToFn: Function) => {
    console.log('navigateToFn', navigateToFn);
    dispatch({
      type: ADD_NAVIGATE_TO_FN,
      payload: navigateToFn,
    });
  };

  return (
    <>
      {zones?.length && (
        <Leaflet
          zones={zones}
          handleZoneSelect={handleZoneSelect}
          t={t}
          selectedZone={selectedZone}
          navigateToRef={navigateToRef}
        />
      )}
    </>
  );
};

export default Map;
