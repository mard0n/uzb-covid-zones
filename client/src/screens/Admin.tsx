import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useContext, useState } from "react";
import { StateContext } from "../state/StateContext";
import { ADD_ZONES } from "../state/reducers/appReducer";
import { useHistory, useLocation } from "react-router-dom";
// import MapZones from "../components/Map/MapZones";
const MapZones = React.lazy(() =>
  import(/* webpackChunkName: 'MapZones' */ "../components/Map/MapZones")
);
// import Graph from "../components/HistoryGraph/Graph";
const Graph = React.lazy(() =>
  import(/* webpackChunkName: 'Graph' */ "../components/HistoryGraph/Graph")
);
// import Restrictions from "../components/Restrictions/Restrictions";
const Restrictions = React.lazy(() =>
  import(
    /* webpackChunkName: 'Restrictions' */ "../components/Restrictions/Restrictions"
  )
);
// import HistoryController from "../components/HistoryGraph/HistoryController";
const HistoryController = React.lazy(() =>
  import(
    /* webpackChunkName: 'HistoryController' */ "../components/HistoryGraph/HistoryController"
  )
);
// import ZoneStatusController from "../components/SelectedZoneName/ZoneStatusController";
const ZoneStatusController = React.lazy(() =>
  import(
    /* webpackChunkName: 'ZoneStatusController' */ "../components/SelectedZoneName/ZoneStatusController"
  )
);
// import RestrictionController from "../components/Restrictions/RestrictionController";
const RestrictionController = React.lazy(() =>
  import(
    /* webpackChunkName: 'RestrictionController' */ "../components/Restrictions/RestrictionController"
  )
);

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
  const { dispatch } = useContext(StateContext);
  const [socket, setSocket] = useState<any>(undefined);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: { token: sessionStorage.token },
    });
    setSocket(socket);
    socket.on("connect", () => {
      socket.emit("initial_data");
      socket.on("push_zones", (zones: any) => {
        console.log('zones', zones);
        dispatch({
          type: ADD_ZONES,
          payload: zones,
        });
      });
    });
    socket.on("connect_error", (error: any) => {});
    socket.on("internal_error", (error: any) => {});
    socket.on("error", (reason: any) => {
      if (reason === "Authentication error") {
        history.push({
          pathname: "/login",
          state: {
            from: location.pathname,
          },
        });
      }
    });
  }, []);
  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "400px 400px 400px",
        }}
      >
        <div className="map">
          <MapZones />
        </div>
        <div className="status-controller">
          {socket && <ZoneStatusController socket={socket} />}
        </div>
        <div className="graph">
          <Graph />
        </div>
        <div className="graph-controller">
          {socket && <HistoryController socket={socket} />}
        </div>
        <div className="restrictions">
          <Restrictions />
        </div>
        <div className="restriction-controller">
          {socket && <RestrictionController socket={socket} />}
        </div>
      </div>
    </>
  );
};

export default Admin;
