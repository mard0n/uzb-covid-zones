import Axios from "axios";

export const authenticate = ({ username = "", password = "" }) => {
  return Axios.post("http://localhost:4000/api/authenticate", {
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
