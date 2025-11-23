import React, { use } from "react";
import AuthContext from "../context/authContext/AuthContext";

function useAuth() {
  const authInfo = use(AuthContext);
  return authInfo;
}

export default useAuth;
