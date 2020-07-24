import "leaflet/dist/leaflet.css";
import React, { useEffect, useContext } from "react";
import MapZones from "../components/Map/MapZones";
import { fetchZones } from "../api/zones";
import { ADD_ZONES } from "../state/reducers/appReducer";
import { StateContext } from "../state/StateContext";
import Search from "../components/Search/index";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "../components/Layout";
import SelectedZoneName from "../components/SelectedZoneName/SelectedZoneName";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { Zone } from "../types/zone";
import { AxiosResponse } from "axios";
import OverallStat from "../components/OverallStats/OverallStat";
import Graph from "../components/HistoryGraph/Graph";
import Restrictions from "../components/Restrictions/Restrictions";
import ChildZones from "../components/ChildZonesTable/ChildZones";
import CallBanner from "../components/Banners/CallBanner";
import WelcomeBanner from "../components/Banners/WelcomeBanner";

function User() {
  const { dispatch, selectedZoneId, zones = [] } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);

  useEffect(() => {
    fetchZones().then((res: AxiosResponse<Zone[]>) => {
      dispatch({
        type: ADD_ZONES,
        payload: res.data,
      });
    });
    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <Layout
        search={<Search />}
        map={<MapZones />}
        mainContent={
          <>
            {!selectedZone && <WelcomeBanner />}
            {selectedZone && <SelectedZoneName />}
            {selectedZone && <OverallStat />}
            {selectedZone?.properties.history && <Graph />}
            <ChildZones />
            <CallBanner />
            {selectedZone && <Restrictions />}
          </>
        }
      />
      
    </>
  );
}

export default User;
