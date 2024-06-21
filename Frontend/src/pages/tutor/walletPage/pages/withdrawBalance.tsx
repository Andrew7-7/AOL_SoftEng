import { Link } from "react-router-dom";
import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./withdrawBalance.css";
import { useEffect, useState } from "react";
import useFetch from "../../../../global/hooks/useFetch";

const WithdrawBalance = () => {
  const [value, setValue] = useState(0);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const amount = Number(
    useFetch("http://localhost:3002/wallet/getAmount/" + user.email).data
  ); //tutor balance

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [originalValue, setOriginalValue] = useState(0);//withdraw amount

  useEffect(() => {
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

  const handleKeyPress = (e: any) => {
    const charCode = e.charCode;
    if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  };

  const formatCurrency = (val: string) => {
    const numericValue = val.replace(/[^0-9]/g, "");
    if (numericValue === "") return "";
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(Number(numericValue))
      .replace("IDR", "Rp.");
    return formatted;
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    const formatted = formatCurrency(value);
    setWithdrawAmount(formatted);
    setOriginalValue(Number(numericValue));
  };

  return (
    <div className="withdrawBalance">
      <TutorNav clickedItem="Wallet" />
      <div className="rightComponent">
        <Link to="/walletPage">
          <p className="back">&lt; Back</p>
        </Link>
        <div className="currentBalance">
          <p>Current Balance</p>
          <p>{formattedValue}</p>
        </div>
        <p className="sectionTitle">Desired Amount to Withdraw</p>
        <div className="inputContainer">
          <input
            placeholder="Input amount"
            className="inputNumber"
            type="text"
            onKeyPress={handleKeyPress}
            value={withdrawAmount}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawBalance;
