import React from "react";
import "./NoChatSelected.css";
import { assets } from "../../assets/assets";
import "./NoChatSelected.css";
const NoChatSelected = () => {
  return (
    <div className="chat">
        
        <div className="no-chat-selected">
            <img src={assets.icon} alt="No Chat Selected" />
            <h2>welcome to Uchat_ai </h2>
            <p>Select a chat to start messaging</p>

        </div>        
    </div>
  );
};

export default NoChatSelected