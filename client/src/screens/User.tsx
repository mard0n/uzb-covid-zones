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
    <div className="User">
      <div style={{ width: "100%", height: "500px" }}>
        <MapZones />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "400px 400px",
        }}
      >
        <Restrictions />
        <Graph />
      </div>
    </div>
  );
}

export default User;
