import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const VerifyToken = () => {
  useEffect(() => {
    const verifyToken = async () => {
      const accToken = window.localStorage.getItem("accToken");
      const user = JSON.parse(window.localStorage.getItem("user") || "{}");
      const email = user.email;
      const extraAuth =
        "aolsoftengasdaskjdbasdjbasjbk342342j3aasjdnasjndakjdn73628732h34m23423jh4v2jg32g34c23h42j4k24nl234l2423kn4k23n42k";

      if (!accToken) {
        // Buat jaga-jaga
        window.localStorage.removeItem("accToken");
        window.localStorage.removeItem("user");
      } else {
        // Verify Access Token
        try {
          const response = await axios.post(
            "http://localhost:3002/user/verifyAccToken",
            { accToken, email },
            {
              headers: {
                "Content-Type": "application/json",
                auth: `Bearer ${extraAuth}`,
              },
            }
          );
          console.log(response.data.user);
        } catch (error) {
          // kalo Access Token sudah expired (Cek Refresh Token)
          console.log(error);
          window.localStorage.removeItem("accToken");

          try {
            const response = await axios.post(
              "http://localhost:3002/user/verifyRefreshToken",
              { user },
              {
                headers: {
                  "Content-Type": "application/json",
                  auth: `Bearer ${extraAuth}`,
                },
              }
            );
            console.log(response.data.accessToken);
            window.localStorage.setItem("accToken",response.data.accessToken);

          } catch (error) {
            // kalo REFRESH Token sudah expired

            console.log(error);
            window.localStorage.removeItem("accToken");
            window.localStorage.removeItem("user");

          }
        }
      }
    };

    verifyToken();
  }, []);

  return <Outlet />;
};

export default VerifyToken;
