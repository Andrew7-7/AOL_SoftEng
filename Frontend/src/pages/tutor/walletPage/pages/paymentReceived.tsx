import { Link } from "react-router-dom";
import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./paymentReceived.css"
import useFetch from "../../../../global/hooks/useFetch";

const TransactionComponent = ({date, title, type, amount, status }: any) => {
    const transactionDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    const day = String(transactionDate.getDate()).padStart(2, "0");
    const monthIndex = transactionDate.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[monthIndex];
    const time = `${String(transactionDate.getHours()).padStart(2, "0")}.${String(
      transactionDate.getMinutes()
    ).padStart(2, "0")}`;
  
    const formattedAmount = amount
      .toLocaleString("en-US", { style: "currency", currency: "IDR" })
      .replace("IDR", "RP.");
  
    const style = {
      borderLeft: type ? "8px solid rgb(15, 172, 15)" : "8px solid red",
    };
    
    const styleStatus = {
        color: status == 'failed'? "red":"black",
    }

    const amountStatus = {
        textDecoration: status == "failed"? "line-through": "none"
    }

    return (
      <div className="transactionComponentMain">
        <div className="transactionLeftComponent" style={style}>
          <p>{day}</p>
          <p>{month}</p>
        </div>
        <p className="status" style = {styleStatus}>{status}</p>
        <div className="transactionRightComponent">
          <div className="componentDetail">
            <p className="title">{title}</p>
            <p>{time}</p>
          </div>
          <div className="componentAmount" style = {amountStatus}>
            {type ? <p>{formattedAmount}</p> : <p>({formattedAmount})</p>}
          </div>
        </div>
      </div>
    );
  };

const RenderPaymentReceived = ({email}:any) => {
    const data = useFetch("http://localhost:3002/wallet/getPayments/" + email).data
    if(!data){
        return <p>there's no payment received</p>
    }

    return(
        <div className="paymentReceivedList">
            {data.map((d:any) => (
                <TransactionComponent status = {d.status} date = {d.date} amount = {d.amount} title = {d.title} type = {d.type}/>
            ))}
        </div>
    )
}

const PaymentReceived = () => {
    const user = JSON.parse(window.localStorage.getItem("user") || "{}");

    return(
        <div className="paymentReceived">
            <TutorNav clickedItem="Wallet"/>
            <div className="rightComponent">
                <Link to = "/walletPage">
                    <p className="back">&lt; Back</p>
                </Link>
                <p className="sectionTitle">Payment Received</p>
                <RenderPaymentReceived email = {user.email}/>
            </div>
        </div>
    )

}

export default PaymentReceived;