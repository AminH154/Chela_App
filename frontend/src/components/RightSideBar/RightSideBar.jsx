import React from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import { useAuth } from "../../store/useAuth";

const RightSideBar = () => {
  const { logOut, authUser } = useAuth();

  return (
    <div className="rightSideBar">
      <div className="rs_nav">
        <div style={{ position: "relative" }}>
          <img
            alt="User Profile"
            src={authUser?.profilePic || assets.utilisateur}
            className="user-profile-image"
          />
          <div className="status"></div>
        </div>
        <h3>{authUser?.fullName || "User"}</h3>
        <p>{authUser?.bio || "bio"}</p>
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
