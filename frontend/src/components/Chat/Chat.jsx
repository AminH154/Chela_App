import React from "react";
import "./Chat.css";
import { assets } from "../../assets/assets";

const Chat = ({name,avatar}) => {

  return (
    <div className="chat">
      <div className="chat_user">
        <div style={{ position: "relative" }}>
          <img src={avatar} alt="User Profile" />
          <div className="status"></div>
        </div>
        <div>
          <p>{name}</p>
          <span>En ligne</span>
        </div>
        <div className="chatuserh">
          <img src={assets.help} alt="Help Icon" />
        </div>
      </div>
      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">hello is me i alaways remember you</p>
          <div>
            <img src={assets.profile} alt="" height={30} width={30} />
            <p>2.30 PM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">hello is me i alaways remember you</p>
          <div>
            <img src={assets.profile} alt="" height={30} width={30} />
            <p >2.30 PM</p>
          </div>
        </div>
        <div className="s-msg">
            <img src={assets.fa} alt="" />
          <div>
            <img src={assets.profile} alt="" height={30} width={30} />
            <p >2.30 PM</p>
          </div>
        </div>
      </div>

      <div className="chat_message">
        <input type="text " placeholder="send a message" />
        <input type="file " id="img" accept="image/png , image/jpeg" hidden />
        <div className="img"></div>
        <label htmlFor="image">
          <img src={assets.image} alt="" height={30} width={30} />
        </label>
        <img src={assets.dm} alt="" height={30} width={30} className="dm" />
      </div>
    </div>
  );
};

export default Chat;