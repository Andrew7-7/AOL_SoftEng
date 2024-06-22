import { Outlet, Navigate } from "react-router-dom";

const NeedLogin = () => {
  let isLoggedIn = window.localStorage.getItem("user");

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default NeedLogin;
