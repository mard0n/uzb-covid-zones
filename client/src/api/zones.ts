import Axios from "axios";

export const fetchZones = () => {
  console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL);
  return Axios.get(process.env.PUBLIC_URL + "/api/zones");
};
