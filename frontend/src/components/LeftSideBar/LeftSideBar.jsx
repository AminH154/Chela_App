import React, { useEffect, useState } from "react";
import "./LeftSideBar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "./../../store/useAuthStore";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { logOut } = useAuthStore();
  const [search, setSearch] = useState("");
  const [ShowOnlineUsers, setShowOnlineUsers] = useState(false);
  const { selectedUser, GetUsers, users, isUserLoding, setSelectedUser } =
    useChatStore();
  const { OnLineUsers } = useAuthStore();
  console.log("OnLineUsers:", OnLineUsers);

  useEffect(() => {
    GetUsers();
  }, [GetUsers]);
   const filteredUsers = users
    .filter(user =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    )
    .filter(user =>
      ShowOnlineUsers ? OnLineUsers.includes(user._id) : true
    );

  if (isUserLoding) return <div className="loader-rotate">Loading...</div>;

  return (
    <div className="leftSideBar">
      <div className="ls_nav">
        <div className="ls_top">
          <img src={assets.icon} alt="" height={40} width={40} />
          <p>
            <span>U</span>chat_ai
          </p>
        </div>

        <div className="menu">
          <img src={assets.menu} alt="" height={40} width={40} />
          <div className="menu_list">
            <p onClick={() => navigate("/profileUpdate")}>Edit Profile</p>
            <hr />
            <p onClick={logOut}>Logout</p>
          </div>
        </div>
      </div>

      <div className="ls_search">
        <img src={assets.search} alt="" />
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="online_users">
        <input
          type="checkbox"
          id="onlineUsers"
          checked={ShowOnlineUsers}
          onClick={() => setShowOnlineUsers(!ShowOnlineUsers)}
        />
        <label htmlFor="onlineUsers">En ligne</label>
      </div>
      <div className="ls-list">
        <div className="friends">
          {filteredUsers?.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`friend ${
                selectedUser?._id === user._id ? "active" : ""
              }`}
            >
              <div className="avatar-status-wrapper">
                <img src={user.profilePic || assets.profile} alt="" />
                <span
                  className={`status-indicator ${
                    OnLineUsers.includes(user._id) ? "online" : "offline"
                  }`}
                ></span>
              </div>
              <div>
                <p>{user.fullName || "User"}</p>
                {OnLineUsers.includes(user._id) ? (
                  <span className="online">En ligne</span>
                ) : (
                  <span className="offline">Hors ligne</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
