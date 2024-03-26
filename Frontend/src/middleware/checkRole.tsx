import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CheckRole = ({role}:{role:string}) => {
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== role) {
      navigate(-1);
    }
  }, []);
  if (user.role !== role) {
    return null;
  }
  return <Outlet />;
};

export default CheckRole;
