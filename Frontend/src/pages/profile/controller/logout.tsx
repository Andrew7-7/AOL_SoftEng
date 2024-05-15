import { NavigateFunction } from "react-router-dom";

const logout = (navigate: NavigateFunction) => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("accToken");
  window.localStorage.removeItem("profile");
  navigate("/login");
};

export default logout;
