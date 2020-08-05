import Axios from "axios";

export const authenticate = ({ username = "", password = "" }) => {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_URL + "/api/authenticate"
      : "http://localhost:4000/api/authenticate";
  return Axios.post(url, {
    username,
    password,
  });
};

// export const checkAuthentication = (token: string) => {
//   return Axios.get("http://localhost:4000/api/is-authenticated", {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };
