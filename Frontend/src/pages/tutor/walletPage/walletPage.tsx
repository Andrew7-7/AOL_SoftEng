import { useEffect, useReducer, useState } from "react";
import TutorNav from "../../../global/components/navbar/tutor/tutorNav";
import TransactionHistoryIcon from "../../../global/assets/transactionHistoryIcon.png";
import withdrawBalanceIcon from "../../../global/assets/withdrawBalanceIcon.png";
import paymentIcon from "../../../global/assets/paymentIcon.png";
import "./walletPage.css";
import { Link } from "react-router-dom";
import useFetch from "../../../global/hooks/useFetch";
import { userInfo } from "os";

const TransactionComponent = ({date, title, type, amount }: any) => {
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

  return (
    <div className="transactionComponentMain">
      <div className="transactionLeftComponent" style={style}>
        <p>{day}</p>
        <p>{month}</p>
      </div>
      <div className="transactionRightComponent">
        <div className="componentDetail">
          <p className="title">{title}</p>
          <p>{time}</p>
        </div>
        <div className="componentAmount">
          {type ? <p>{formattedAmount}</p> : <p>({formattedAmount})</p>}
        </div>
      </div>
    </div>
  );
};

const RenderRecentTransaction = ({email}:any) => {
  const data: any = useFetch(
    "http://localhost:3002/wallet/getFinalTransaction/tutor"
  ).data;

  if (!data) {
    return <p>there's no recent transaction</p>;
  } else if (data.length < 5) {
    return (
      <>
        {data.map((d: any, index: number) => (
          <TransactionComponent
            key={index}
            title={d.title}
            amount={d.amount}
            type={d.type}
            date={d.date}
          />
        ))}
      </>
    );
  }
  return (
    <>
      {data.slice(0, 5).map((d: any, index: number) => (
        <TransactionComponent
          key={index}
          title={d.title}
          amount={d.amount}
          type={d.type}
          date={d.date}
        />
      ))}

    </>
  );
};


const WalletPage = () => {
  const [value, setValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState("");
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const amount = Number(useFetch("http://localhost:3002/wallet/getAmount/" + user.email).data)


  useEffect(() => {

    // setUserEmail(user?.email);
    console.log(user)
    if (amount !== undefined) { 
      setValue(Number(amount));
      const formatValue = (val: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "IDR",
        })
          .format(val)
          .replace("IDR", "Rp.");
      };
      setFormattedValue(formatValue(Number(amount)));
    }
  }, [amount]);

  return (
    <div className="walletPageMain">
      <TutorNav clickedItem="Wallet" />
      <div className="walletPageRight">
        <p className="activeBalance">Active Balance {formattedValue}</p>
        <div className="walletMenu">
          <Link to="/walletPage/TransactionHistory">
            <img src={TransactionHistoryIcon} />
            <p>Transaction History</p>
          </Link>
          <Link to="/walletPage/withdraw">
            <img src={withdrawBalanceIcon} />
            <p>Withdraw Balance</p>
          </Link>
          <Link to="/walletPage/payment">
            <img src={paymentIcon} />
            <p>Payment Received</p>
          </Link>
        </div>
        <p className="sectionTitle">Recent Transaction</p>
        <div className="recentTransaction">
          <RenderRecentTransaction email = {user.email}/>
          <Link to="/walletPage/TransactionHistory">
            <p className="viewAllTransaction">View All Transaction</p>
          </Link>
        </div>
        <p className="sectionTitle">Pending Payment</p>
        <div className="pendingPayment">
          <p>hello there</p>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
