import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { authenticate } from "../api/auth";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  const location = useLocation();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    setMessage("");
    authenticate({ username, password }).then((res) => {
      if (res.data) {
        sessionStorage.setItem("token", res.data);
        history.replace((location.state as any).from);
      } else {
        setMessage("Wrong credentials");
      }
    });
  };
  return (
    <>
      {message}
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Login;
