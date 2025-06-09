import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import "./Chat.css";
import { assets } from "../../assets/assets";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatSkeletons from "../ChatSkeletons/ChatSkeletons";

const Chat = () => {
  const { messages, selectedUser, isMessagesLoading, getMessages } = useChatStore();
  const { OnLineUsers } = useAuthStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    useChatStore.setState({ messages: [] });
    getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  if (isMessagesLoading)
    return (
      <div className="chat-container">
        <ChatHeader />
        <div className="chat-messages">
          <ChatSkeletons />
          <div className="chat-input-container">
            <ChatInput />
          </div>
        </div>
      </div>
    );

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages">
        {messages?.length > 0 ? (
          <>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`message ${
                  message.senderMessage === selectedUser._id ? "sender" : "receiver"
                }`}
              >
                <img
                  src={
                    message.recivedMessage === selectedUser._id
                      ? selectedUser?.profilePic || assets.profile
                      : authUser?.profilePic || assets.profile
                  }
                  alt="avatar"
                />
                <div className="message-content">
                  <p className="message-text">{message.text}</p>
                  {message.Image && (
                    <img src={message.Image} alt="attachment" />
                  )}
                  <span className="message-time">{dayjs(message.createdAt).format("HH:mm")}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="no-messages">No messages yet</div>
        )}
        <div className="chat-input-container">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
