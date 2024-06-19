import { useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import "./reportReview.css";
import pencil from "../../../global/assets/icon _pencil_.png";
import useFetch from "../../../global/hooks/useFetch";
import axios from "axios";

const accToken = window.localStorage.getItem("accToken");
const ReportDetailPopup = ({ report, onClose, blockUser }: any) => {
  return (
    <div className="popupReport">
      <div className="popupReport-content">
        <h2>Report Details</h2>
        <p>User Name&emsp;: {report.userName}</p>
        <p>Sender&emsp;&emsp;&emsp;: {report.sender}</p>
        <p>Message</p>
        <p>{report.message}</p>
      </div>
      <div>
        <button className="popupReport-button" onClick={onClose}>
          Close
        </button>
        <button className="popupReport-button-ban" onClick={blockUser}>
          Ban
        </button>
      </div>
      <div className="popupReport-overlay" onClick={onClose}></div>
    </div>
  );
};

const ReportListComponent = (props: any) => {
  const [user, setUser] = useState(props.user);
  const [sender, setSender] = useState(props.sender);
  const [message, setMessage] = useState(props.message);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsVisible(true);
  };

  const blockUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3002/admin/blockUser",
        { email: user, block: true },
        {
          headers: {
            auth: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        /// buat API reviewed TRUE
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="reportListComponentContainer">
          <p className="first">{user}</p>
          <p className="second">{sender}</p>
          <p className="third">{message}</p>
          <button
            className="reportListButton"
            onClick={() => (setIsPopupOpen(true), setIsVisible(false))}
          >
            <img src={pencil} className="fourth" />
          </button>
        </div>
      )}
      {isPopupOpen && (
        <ReportDetailPopup
          report={{
            userName: props.user,
            sender: props.sender,
            message: props.message,
          }}
          onClose={togglePopup}
          blockUser={blockUser}
        />
      )}
    </div>
  );
};

const ReportList = (props: any) => {
  let reportData = props.data;
  const searchInput = props.searchInput;

  if (searchInput != "") {
    reportData = reportData.filter(
      (report: any) =>
        report.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
        report.sender.toLowerCase().includes(searchInput.toLowerCase()) ||
        report.message.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  return (
    <>
      <div className="reportListHeader">
        <p className="first">User Name</p>
        <p className="second">Sender</p>
        <p className="third">Message</p>
        <p className="fourth"></p>
      </div>
      <div className="reportListBody">
        {reportData && reportData.length > 0 ? (
          reportData.map((report: any) => (
            <ReportListComponent
              key={report.id}
              user={report.user}
              sender={report.sender}
              message={report.message}
            />
          ))
        ) : (
          <div>
            {" "}
            Please wait your request is being processed, if you see this long
            enough you request might be invalid
          </div>
        )}
      </div>
    </>
  );
};

const ReportReviewPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const { data: reportData } = useFetch(
    "http://localhost:3002/report/getReports"
  );

  return (
    <div className="reportReviewPage">
      <AdminNav clickedItem="Report" />
      <div className="reportReviewMainContent">
        <div className="reportReviewHeader">
          <p className="reportReviewHeader-title">Report Review</p>
          <input
            className="searchBar"
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="reportReviewBody">
          <ReportList data={reportData} searchInput={searchInput} />
        </div>
      </div>
    </div>
  );
};

export default ReportReviewPage;
