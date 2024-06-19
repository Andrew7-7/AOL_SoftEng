import { useEffect, useState } from "react";
import TutorNav from "../../../global/components/navbar/tutor/tutorNav";
import TransactionHistoryIcon from "../../../global/assets/transactionHistoryIcon.png"
import withdrawBalanceIcon from "../../../global/assets/withdrawBalanceIcon.png"
import paymentIcon from "../../../global/assets/paymentIcon.png"
import "./walletPage.css"
import { Link } from "react-router-dom";


const TransactionComponent = () => {
    return (
        <div className="transactionComponentMain">
            Hello
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
                    <Link to = "/walletPage">
                        <img src = {TransactionHistoryIcon}/>
                        <p>Transaction History</p>
                    </Link>
                    <Link to = "/walletPage">
                        <img src = {withdrawBalanceIcon}/>
                        <p>Withdraw Balance</p>
                    </Link>
                    <Link to = "/walletPage">
                        <img src = {paymentIcon}/>
                        <p>Payment Received</p>
                    </Link>
                </div>
                <p className="sectionTitle">Recent Transaction</p>
                <div className="recentTransaction">
                    <TransactionComponent />
                    <TransactionComponent />
                    <TransactionComponent />
                    <Link to = "/walletPage">
                        <p className="viewAllTransaction">View All Transaction</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WalletPage;