import { NavigateFunction } from "react-router-dom";

const logout = (navigate: NavigateFunction) => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("accToken");
  navigate("/");
};

export default logout;
