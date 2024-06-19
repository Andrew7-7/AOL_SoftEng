import { useEffect, useState } from "react";
import TutorNav from "../../../global/components/navbar/tutor/tutorNav";
import TransactionHistoryIcon from "../../../global/assets/transactionHistoryIcon.png"
import withdrawBalanceIcon from "../../../global/assets/withdrawBalanceIcon.png"
import paymentIcon from "../../../global/assets/paymentIcon.png"
import "./walletPage.css"
import { Link } from "react-router-dom";


    const TransactionComponent = ({date, title, type, amount}:any) => {
    const tempDate = 18;
    const tempMonth = "January"
    const tempTime = "07.07"
    const formattedAmount = amount.toLocaleString('en-US', {style: 'currency', currency: 'IDR', }).replace("IDR", 'RP.')

    const style = {
        borderLeft: type == "true"? '5px solid rgb(15, 172, 15)' : '5px solid red'
    };

    return (
        <div className="transactionComponentMain">
            <div className="transactionLeftComponent" style = {style}>
                <p>{tempDate}</p>
                <p>{tempMonth}</p>
            </div>
            <div className="transactionRightComponent">
                <div className="componentDetail">
                    <p className="title">{title}</p>
                    <p>{tempTime}</p>
                </div>
                <div className="componentAmount">
                    {type == "true"? <p>{formattedAmount}</p>:<p>({formattedAmount})</p>}
                </div>
            </div>
        </div>
    )
}

const WalletPage = () => {
    const [value, setValue] = useState(1000000)
    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        const formatValue = (val:any) => {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(val).replace('IDR', 'Rp.');
        };
        setFormattedValue(formatValue(value));
      }, [value]); 
    
    return(
        <div className="walletPageMain">
            <TutorNav clickedItem="Wallet"/>   
            <div className="walletPageRight">
                <p className="activeBalance">Active Balance  {formattedValue}</p>
                <div className="walletMenu">
                    <Link to = "/walletPage/TransactionHistory">
                        <img src = {TransactionHistoryIcon}/>
                        <p>Transaction History</p>
                    </Link>
                    <Link to = "/walletPage/withdraw">
                        <img src = {withdrawBalanceIcon}/>
                        <p>Withdraw Balance</p>
                    </Link>
                    <Link to = "/walletPage/payment">
                        <img src = {paymentIcon}/>
                        <p>Payment Received</p>
                    </Link>
                </div>
                <p className="sectionTitle">Recent Transaction</p>
                <div className="recentTransaction">
                    <TransactionComponent date = "21 May" title = "withdrawal" type = "true" amount = {500000}/>
                    <TransactionComponent date = "21 May" title = "withdrawal" type = "false" amount = {500000}/>
                    <Link to = "/walletPage">
                        <p className="viewAllTransaction">View All Transaction</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WalletPage;