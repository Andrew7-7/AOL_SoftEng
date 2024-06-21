import { useEffect } from "react";
import "./materialPage.css"
import axios from "axios";
import { useParams } from "react-router-dom";

const MaterialPage = () => {
  const { id } = useParams();

  const accToken = window.localStorage.getItem("accToken");
	
	useEffect(() => {
    const getActiveClassDetail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/tutor/getCurrActiveClassDetail",
          { id },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
					console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActiveClassDetail();
  }, []);

	return(
		<div className="material-page">
				<div></div>
		</div>
	)

}

export default MaterialPage;