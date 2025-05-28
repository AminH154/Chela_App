import React  from "react";
import "./LeftSideBar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
const LeftSideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="leftSideBar">
      <div className="ls_nav">
        <div className="ls_top">
          <img src={assets.icon} alt="" height={40} width={40} />
          <p>
            <span>U</span>ni Market_chat
          </p>
        </div>

        <div className="menu">
          <img src={assets.menu} alt="" height={40} width={40} />
          <div className="menu_list">
            <p  onClick={() => navigate("/profileUpdate")}>Edit Profile</p>
            <hr />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="ls_search">
        <img src={assets.search} alt="" />
        <input type="text" placeholder="Search ..." />
      </div>
      <div className="ls-list">
            <div className="friends ">
              <img src={assets.profile} alt="" />
              <div>
                 <p>amin</p>
                 <span>En ligne</span>

              </div>
              
            </div>
  
      </div>
    </div>
  );
};

export default LeftSideBar;
