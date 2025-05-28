import React from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import { useAuth } from "../../store/useAuth";


const RightSideBar = () => {
   const { logOut } = useAuth();

  return (
    <div className="rightSideBar">
      <div className="rs_nav">
        <div style={{ position: "relative" }}>
          <img
    
            alt="User Profile"
            src={assets.profile}
          />
          <div className="status"></div>
        </div>
        <h3>amin</h3>
        <p>amin</p>
      </div>
      <hr />
      <p>Media</p>
      <p>Fichier et contenus multimédias</p>
      <div className="deconnecte">
        <img src={assets.profile  } alt="Deconnecte" />
        <p onClick={logOut}>Deconnexion</p>
      </div>
    </div>
  );
};

export default RightSideBar;
