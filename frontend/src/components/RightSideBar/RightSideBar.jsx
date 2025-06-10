import React from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import {  useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const RightSideBar = () => {
  const { logOut, authUser } =useAuthStore();
  const {selectedUser} = useChatStore();

  return (
    <div className="rightSideBar">
      <div className="rs_nav">
        <div style={{ position: "relative" }}>
          <img
            alt="User Profile"
            src={selectedUser?.profilePic || authUser?.profilePic}
            className="user-profile-image"
          />
          <div className="status"></div>
        </div>
        <h3>{selectedUser?.fullName || authUser?.fullName}</h3>
        <p>{selectedUser?.bio || authUser?.bio }</p>
      </div>
      <hr />
      <p>Media</p>
      <p>Fichier et contenus multimédias</p>
      <div className="deconnecte">
        <img
          src={authUser?.profilePic || assets.utilisateur}
          alt="Deconnecte"
        />
        <p onClick={logOut}>Deconnexion</p>
      </div>
    </div>
  );
};

export default RightSideBar;
