import React from "react";
import "./Home.css"
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Chat from "../../components/Chat/Chat";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { useChatStore } from './../../store/useChatStore';
import NoChatSelected from "../../components/NoChat/NoChatSelected";
const Home = () => {
  const {selectedUser} = useChatStore();
 
  return (
    <div className="home">
      <div className="chat_container">
        <LeftSideBar />
        {!selectedUser ? <NoChatSelected/> : <Chat />}
        <RightSideBar  />
      </div>
    </div>
  );
};

export default Home;
