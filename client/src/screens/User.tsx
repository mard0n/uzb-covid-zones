import "leaflet/dist/leaflet.css";
import React, { useEffect, useContext } from "react";
import Restrictions from "../components/Restrictions";
import MapZones from "../components/MapZones";
import Graph from "../components/Graph";
import { fetchZones, fetchZonesStatus } from "../api/zones";
import {
  ADD_ZONES,
  ADD_STATUS_DESCRIPTION,
} from "../state/reducers/appReducer";
import { StateContext } from "../state/StateContext";
import Search from "../components/Search";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import Layout from "../components/Layout";

function User() {
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    fetchZones().then((res) => {
      dispatch({
        type: ADD_ZONES,
        payload: res.data,
      });
    });
    fetchZonesStatus().then((res) => {
      const turnEmptyToUndef = res?.data.map((d: any) => ({
        ...d,
        range: [d.range[0] || undefined, d.range[1] || undefined],
      }));
      dispatch({
        type: ADD_STATUS_DESCRIPTION,
        payload: turnEmptyToUndef,
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
            <Typography variant="h1">H1</Typography>
            <Typography variant="subtitle1">Subtitle1</Typography>
            <Typography variant="body1">body1</Typography>
            <Typography variant="body2">body2</Typography>
            <Typography variant="caption">caption</Typography>
            <Typography variant="overline">overline</Typography>
          </>
        }
      />

      {/* <Search/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "400px 400px",
        }}
      >
        <Restrictions />
        <Graph />
      </div> */}
    </>
  );
}

export default User;
