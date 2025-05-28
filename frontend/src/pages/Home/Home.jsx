import React from "react";
import { useAuth } from "../../store/useAuth";
import "./Home.css"
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Chat from "../../components/Chat/Chat";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
const Home = () => {
 
  return (
    <div className="home">
      <div className="chat_container">
        <LeftSideBar />
        <Chat />
        <RightSideBar  />
      </div>
    </div>
  );
};

export default Home;
