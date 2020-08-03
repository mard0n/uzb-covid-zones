import Axios from "axios";

export const fetchZones = () => {
  return Axios.get(process.env.PUBLIC_URL + "/api/zones");
};
