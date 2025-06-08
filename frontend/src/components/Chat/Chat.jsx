import React, { useEffect } from "react";
import "./Chat.css";

import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatSkeletons from "../ChatSkeletons/ChatSkeletons";

const Chat = () => {
  const { selectedUser, isMessagesLoading, getMessages } = useChatStore();
  const { OnLineUsers } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  if (isMessagesLoading)
    return (
      <div className="chat-container">
        <div className="chat-content">
          <ChatHeader />
          <ChatSkeletons />
        </div>
        <ChatInput />
      </div>
    );

  return (
     <div className="chat-container">
        <div className="chat-content">
          <ChatHeader />

        </div>

        <ChatInput />
      </div>
  );
};

export default Chat;
