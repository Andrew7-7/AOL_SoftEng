import { ChangeEvent, useEffect, useState } from "react";
import AdminNav from "../../../../global/components/navbar/admin/adminNav";
import blockImage from "../../../../global/assets/block.png";
import UnblockImage from "../../../../global/assets/unlock.png";
import warningImage from "../../../../global/assets/warning.png";
import "./accManagementCSS.css";
import axios from "axios";
import { IUser } from "../../../../global/model/user-interface";
const AccountManagementPage = () => {
  const accToken = window.localStorage.getItem("accToken");
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchUsers, setSearchUsers] = useState<IUser[]>([]);
  const [warningEmail, setWarningEmail] = useState("");
  const [warningPopup, setWarningPopup] = useState(false);
  const [warningText, setWarningText] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search === "") {
      setSearchUsers(users);
    } else {
      setSearchUsers(
        users.filter((user) =>
          user.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await axios.get("http://localhost:3002/admin/getUsers", {
          headers: {
            auth: `Bearer ${accToken}`,
          },
        });
        setUsers(res.data);
        setSearchUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersData();
  }, []);

  const WarningModal = () => {
    const warningUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/admin/warningUser",
          { email: warningEmail, text: warningText },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
          setWarningPopup(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        <div className="warningModalBlur">
          <div className="warningModal">
            <p className="warningPopupTitle">
              Send Warning to <b>{warningEmail}</b>
            </p>
            <textarea
              className="warningText"
              onChange={(e) => setWarningText(e.target.value)}
            ></textarea>
            <div className="actionWarningButton">
              <button
                onClick={() => {
                  setWarningPopup(false), setWarningText("");
                }}
                className="cancelWarningButton"
              >
                Cancel
              </button>
              <button className="sendButton" onClick={warningUser}>
                Send
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const AccountCard = ({
    index,
    email,
    role,
    isBanned,
  }: {
    index: number;
    email: string;
    role: string;
    isBanned: boolean;
  }) => {
    let block = isBanned === true ? false : true;
    const blockUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/admin/blockUser",
          { email, block },
          {
            headers: {
              auth: `Bearer ${accToken}`,
            },
          }
        );
        if (res.status === 200) {
          const userIndex = users.findIndex((user) => user.email === email);

          if (userIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[userIndex].isBanned = block;
            setUsers(updatedUsers);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div key={index} className="accountCard">
        <div className="dataDiv">
          <p>{email}</p>
        </div>
        <div className="roleDiv">
          <p>{role}</p>
        </div>
        <div className="actionDiv">
          {isBanned === false ? (
            <div className="blockDiv" onClick={blockUser}>
              <img src={blockImage}></img>
              <p>Block</p>
            </div>
          ) : (
            <div className="UnblockDiv" onClick={blockUser}>
              <img className="unblockImage" src={UnblockImage}></img>
              <p>Unblock</p>
            </div>
          )}
          <div
            onClick={() => {
              setWarningEmail(email), setWarningPopup(true);
            }}
            className="warningDiv"
          >
            <img src={warningImage}></img>
            <p>Warning</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="outerDiv">
      {warningPopup === true ? WarningModal() : null}
      <AdminNav clickedItem="Account" />
      <div className="accountManagement">
        <p className="accManagementTitle">Account Management</p>
        <input
          className="searchBar"
          placeholder="Search"
          type="search"
          onChange={handleInputChange}
        ></input>
        <div className="tableHeader">
          <div className="dataDiv">
            <p>Email</p>
          </div>
          <div className="roleDiv">
            <p>Role</p>
          </div>
          <div className="actionDiv">Action</div>
        </div>
        <div className="accountTable">
          {searchUsers.map((user, index) => (
            <AccountCard
              index={index}
              email={user.email}
              role={user.role}
              isBanned={user.isBanned}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
