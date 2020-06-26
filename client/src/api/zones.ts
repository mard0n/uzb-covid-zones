import Axios from "axios";

export const fetchZones = () => {
  return Axios.get("http://localhost:4000/api/zones");
};

export const fetchZonesStatus = () => {
  return Axios.get("http://localhost:4000/api/zones-status");
};