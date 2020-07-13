import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useContext, useState } from "react";
import MapZones from "../components/MapZones";
import Graph from "../components/Graph";
import Restrictions from "../components/Restrictions";
import { fetchZones } from "../api/zones";
import HistoryController from "../components/HistoryController";
import { StateContext } from "../state/StateContext";
import { ADD_ZONES } from "../state/reducers/appReducer";
import { useHistory, useLocation } from "react-router-dom";
import ZoneStatusController from "../components/ZoneStatusController";
import RestrictionController from "../components/RestrictionController";

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
    console.log("socket.id", socket.id);
    socket.on("connect", () => {
      console.log("connect", socket.id); // 'G5p5...'
      socket.emit("initial_data");
      socket.on("push_zones", (zones: any) => {
        console.log("zones", zones);
        dispatch({
          type: ADD_ZONES,
          payload: zones,
        });
      });
    });
    socket.on("connect_error", (error: any) => {
      console.log("connect_error", error);
    });
    socket.on("internal_error", (error: any) => {
      console.log("internal_error", error);
    });
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

    // socket.emit('initial_data')
    // fetchZones().then((res) => {

    // });
  }, []);
  console.log("socket", socket);
  return (
    <>
      {/* <Search /> */}
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
