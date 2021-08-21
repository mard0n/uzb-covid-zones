import Axios from "axios";

export const fetchZones = () => {
  console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL);
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL + "/api/zones"
      : "http://localhost:4000/api/zones";
  return Axios.get(url);
};
