import { Link, useNavigate } from "react-router-dom";
import TutorNav from "../../../../global/components/navbar/tutor/tutorNav";
import "./withdrawBalance.css";
import { useEffect, useState } from "react";
import useFetch from "../../../../global/hooks/useFetch";
import verifyPassword from "./withdrawalController";


const WithdrawalValidation = ({ email, amount }: any) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <p className="sectionTitle">Input your password</p>
      <input
        className="passwordInput"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style = {{color: "red"}}>{error}</p>
      <div className="withdrawalValidationButton">
        <button className="withdrawButton" onClick={() => verifyPassword(email, password, setError, navigate, amount)}>
          <p>Confirm</p>
        </button>
        <Link to="/walletPage">
          <button className="withdrawButton">
            <p>Cancel</p>
          </button>
        </Link>
      </div>
    </>
  );
};

const WithdrawBalance = () => {
  const [value, setValue] = useState(0);
  const user = JSON.parse(window.localStorage.getItem("user") || "{}");
  const amount = Number(
    useFetch("http://localhost:3002/wallet/getAmount/" + user.email).data
  ); // tutor balance

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [originalValue, setOriginalValue] = useState(0); // withdraw amount
  const [accountNumber, setAccountNumber] = useState("");
  const [isClicked, setIsClicked] = useState(false);

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
            disabled={isClicked}
            style={{ backgroundColor: "white" }}
          />
        </div>
        {originalValue > amount ? (
          <p style={{ color: "red" }}>Your balance is insufficient</p>
        ) : null}
        <p className="sectionTitle">Input your Account number</p>
        <input
          placeholder="Input Account Number"
          className="inputNumber"
          type="text"
          onKeyPress={handleKeyPress}
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={isClicked}
          style={{ backgroundColor: "white" }}
        />
        <button
          onClick={() => setIsClicked(true)}
          disabled={!(accountNumber && originalValue <= amount && !isClicked)}
          className="withdrawButton"
          style={{ opacity: isClicked ? 0.8 : 1 }}
        >
          <p>Withdraw now</p>
        </button>

        {isClicked ? <WithdrawalValidation email={user.email} amount = {originalValue} /> : null}
      </div>
    </div>
  );
};

export default WithdrawBalance;
