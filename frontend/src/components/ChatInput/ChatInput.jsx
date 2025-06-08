import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./ChatInput.css";
import { toast } from "react-toastify";
const ChatInput = () => {
  const [Message, SetMessage] = useState("");
  const [PhotoPic, SetPhotoPic] = useState("");
  const [File, SetFile] = useState(null);

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if(!Message.trim() && !PhotoPic){
      toast.error("Please enter a message or select an image to send.");
      return;
    }
    try{
      await SendMessage({
        text: Message,   
        Image: PhotoPic,
      });
      SetMessage("");
      SetPhotoPic("");
      SetFile(null);
    } catch (error) {
      toast.error("Failed to send message.",error);
    }
    
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    SetFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        SetPhotoPic(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      SetPhotoPic("");
      toast.error("please select a valid image");
    }
  };

  const canSend = Message.trim() || PhotoPic;

  return (
    <div className="chat_message">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="send a message"
          value={Message}
          onChange={(e) => SetMessage(e.target.value)}
        />
        <input
          type="file"
          id="img"
          accept="image/png, image/jpeg"
          hidden
          onChange={handleFileChange}
        />
        <div className="img">
          {PhotoPic && (
            <img src={PhotoPic} alt="preview" height={40} style={{ marginRight: 8 }} />
          )}
        </div>
        <label htmlFor="img">
          <img src={assets.image} alt="" height={30} width={30} />
        </label>
        <button type="submit" disabled={!canSend}>
          <img src={assets.dm} alt="" height={30} width={30} className="dm" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;