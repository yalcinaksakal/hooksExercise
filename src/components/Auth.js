import React, { useContext } from "react";

import Card from "./UI/Card";
import "./Auth.css";
import { AuthContext } from "../context/auth-context";

const Auth = props => {
  const { login } = useContext(AuthContext);

  return (
    <div className="auth">
      <Card>
     
        <p>Please log in to continue.</p>
        <button onClick={login}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
