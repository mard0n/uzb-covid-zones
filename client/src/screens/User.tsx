import React, { useEffect, useContext, Suspense } from "react";
import { fetchZones } from "../api/zones";
import { ADD_ZONES } from "../state/reducers/appReducer";
import { StateContext } from "../state/StateContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { Zone } from "../types/zone";
import { AxiosResponse } from "axios";
import { lazyPreload } from "../utils/lazyPreload";
import Layout from "../components/Layout";
import Search from "../components/Search/index";
import WelcomeBanner from "../components/Banners/WelcomeBanner";
import ChildZones from "../components/ChildZonesTable/ChildZones";
import CallBanner from "../components/Banners/CallBanner";
// import Map from "../components/Map/Leaflet";
import Map from "../components/Map";
const SelectedZoneName = lazyPreload(() => import(/* webpackChunkName: 'SelectedZoneName' */"../components/SelectedZoneName/SelectedZoneName"))
// import SelectedZoneName from "../components/SelectedZoneName/SelectedZoneName";
const OverallStat = lazyPreload(() => import(/* webpackChunkName: 'OverallStat' */"../components/OverallStats/OverallStat"))
// import OverallStat from "../components/OverallStats/OverallStat";
const Graph = lazyPreload(() => import(/* webpackChunkName: 'Graph' */"../components/HistoryGraph/Graph"))
// import Graph from "../components/HistoryGraph/Graph";
const Restrictions = lazyPreload(() => import(/* webpackChunkName: 'Restrictions' */"../components/Restrictions/Restrictions"))
// import Restrictions from "../components/Restrictions/Restrictions";

function User() {
  const { dispatch, selectedZoneId, zones = [] } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  useEffect(() => {
    fetchZones().then((res: AxiosResponse<Zone[]>) => {
      dispatch({
        type: ADD_ZONES,
        payload: res.data || [],
      });
      console.log('res.data', res.data);
      
      SelectedZoneName.preload()
      OverallStat.preload()
      Graph.preload()
      Restrictions.preload()
    });
    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <Layout
        search={<Search />}
        map={<Map/>}
        mainContent={
          <Suspense fallback={<>Loading...</>}>
            {!selectedZone && <WelcomeBanner />}
            {selectedZone && <SelectedZoneName />}
            {selectedZone && <OverallStat />}
            {selectedZone?.properties?.history && <Graph />}
            <ChildZones />
            <CallBanner />
            {selectedZone && <Restrictions />}
          </Suspense>
        }
      />
    </>
  );
}

export default User;
