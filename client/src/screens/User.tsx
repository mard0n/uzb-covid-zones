import "leaflet/dist/leaflet.css";
import React, { useEffect, useContext } from "react";
import MapZones from "../components/MapZones";
import { fetchZones } from "../api/zones";
import { ADD_ZONES } from "../state/reducers/appReducer";
import { StateContext } from "../state/StateContext";
import Search from "../components/Search/index";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Grid } from "@material-ui/core";
import Layout from "../components/Layout";
import SelectedZoneName from "../components/SelectedZoneName";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { Zone } from "../types/zone";
import { AxiosResponse } from "axios";
import OverallStat from "../components/OverallStat";

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
          selectedZone ? (
            <Grid direction={"row"}>
              <SelectedZoneName
                zoneName={selectedZone?.properties?.displayName}
                zoneStatus={selectedZone?.properties?.status}
              />
              <OverallStat
                totalInfected={selectedZone?.properties?.total.infectedNumber}
                totalRecovered={selectedZone?.properties?.total.recoveredNumber}
                totalDead={selectedZone?.properties?.total.deadNumber}
              />
            </Grid>
          ) : (
            <></>
          )
        }
      />
    </>
  );
}

export default User;
