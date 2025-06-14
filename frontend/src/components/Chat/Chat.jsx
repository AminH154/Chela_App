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
  const { messages, selectedUser, isMessagesLoading, getMessages ,SubscribeToMessages, UnsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const [selectedMsg, setSelectedMsg] = React.useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const initializeChat = async () => {
      try {
        await getMessages(selectedUser._id);
        SubscribeToMessages();
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
    return () => {
      UnsubscribeFromMessages();
    };
  }, [selectedUser, getMessages, SubscribeToMessages, UnsubscribeFromMessages]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((msg) => {
      const date = dayjs(msg.createdAt).format("YYYY-MM-DD");
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const grouped = groupMessagesByDate(messages);
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  if (isMessagesLoading)
    return (
      <div className="chat-container">
        <ChatHeader />
        <div className="chat-messages">
          <ChatSkeletons />
        </div>
        <div className="chat-input-container">
          <ChatInput />
        </div>
      </div>
    );

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages">
        {messages?.length > 0 ? (
          <>
            {Object.keys(grouped).map((date) => (
              <React.Fragment key={date}>
                <div className="date-separator">
                  {date === today
                    ? "Aujourd'hui"
                    : date === yesterday
                    ? "Hier"
                    : dayjs(date).format("DD MMM YYYY")}
                </div>
                {grouped[date].map((message, idx) => (
                  <div
                    key={message._id || idx}
                    className={`message ${
                      message.senderMessage === selectedUser._id
                        ? "sender"
                        : "receiver"
                    }`}
                    onClick={() => setSelectedMsg(message._id || idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        message.recivedMessage === selectedUser._id
                          ? selectedUser?.profilePic || assets.profile
                          : authUser?.profilePic || assets.profile
                      }
                      alt="avatar"
                    />
                    {message.Image && !message.text ? (
                      <img src={message.Image} alt="attachment" />
                    ) : (
                      <div className="message-content">
                        {message.text && (
                          <p className="message-text">{message.text}</p>
                        )}
                        {message.Image && (
                          <img src={message.Image} alt="attachment" />
                        )}
                      </div>
                    )}
                    {selectedMsg === (message._id || idx) && (
                      <span className="message-time-popup">
                        {dayjs(message.createdAt).format("HH:mm")}
                      </span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="no-messages">No messages yet</div>
        )}
      </div>
      <div className="chat-input-container">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
