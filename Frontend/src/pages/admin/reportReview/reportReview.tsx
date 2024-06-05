import { useState } from "react";
import AdminNav from "../../../global/components/navbar/admin/adminNav";
import "./reportReview.css"
import pencil from "../../../global/assets/icon _pencil_.png"
import useFetch from "../../../global/hooks/useFetch";

const ReportListComponent = (props:any) => {

    const [user, setUser] = useState(props.user)
    const [sender, setSender] = useState(props.sender)
    const [message, setMessage] = useState(props.message)

    return(
        <div className="reportListComponentContainer">
            <p className="first">{user}</p>
            <p className="second">{sender}</p>
            <p className="third">{message}</p>
            <img src = {pencil} className="fourth"/>
        </div>
    )

}

const ReportList = () => {
    const {data: reportData} = useFetch ("http://localhost:3002/report/getReports")

    return(
        <>
            <div className="reportListHeader">
                <p className="first">User Name</p>
                <p className="second">Sender</p>
                <p className="third">Message</p>
                <p className="fourth"></p>
            </div>
            <div className="reportListBody">
                {reportData && reportData.length > 0 ? (
                    reportData.map((report:any) => (
                        <ReportListComponent 
                            key = {report.id}
                            user={report.userName}
                            sender={report.sender}
                            message={report.message}
                        />
                    ))
                ) : (
                    <div> loading ... </div>
                )}
            </div>
        </>
    )
}

const ReportReviewPage = () => {
    const [searchInput, setSearchInput] = useState("")

    return(
        <div className="reportReviewPage">
            <AdminNav clickedItem="Report"/>
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
                    <ReportList />
                </div>
            </div>
        </div>
    )
}

export default ReportReviewPage;