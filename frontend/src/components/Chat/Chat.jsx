import React, { useEffect } from "react";
import "./Chat.css";
import { assets } from "../../assets/assets";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatSkeletons from "../ChatSkeletons/ChatSkeletons";
import MessagesInput from "../MessagesInput/MessagesInput";
const Chat = () => {
  const {selectedUser,isMessagesLoading,messages,getMessages,setSelectedUser} = useChatStore();
  const {OnLineUsers} = useAuthStore();

  useEffect(()=>{
    getMessages(selectedUser._id);
  },[selectedUser,getMessages]);


  if (isMessagesLoading) return <div className="chat">
    <ChatHeader />
    <ChatSkeletons messages={messages} />
    <MessagesInput/>
  </div>;



  return (
    <div className="chat">
      <ChatHeader />
      <ChatInput />
      <MessagesInput />
    </div>
  );
};

export default Chat;