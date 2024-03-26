import { Outlet, Navigate } from "react-router-dom";

const AlreadyLoggedIn = () => {
  let isLoggedIn = window.localStorage.getItem("user");

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AlreadyLoggedIn;
