import React, { useState } from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const RightSideBar = () => {
  const { logOut, authUser } = useAuthStore();
  const { selectedUser, messages } = useChatStore();
  const { onLineUsers } = useAuthStore();
  const [showGallery, setShowGallery] = useState(false);

  const isOnline =
    selectedUser && onLineUsers
      ? onLineUsers.includes(selectedUser._id)
      : false;

  console.log("Messages:", messages);
  const photoBetweenUsers = messages
    .filter((message) => message.Image)
    .map((message) => message.Image);
  console.log("Photo Between Users:", photoBetweenUsers);
  return (
    <div className="rightSideBar">
      <div className="rs_nav">
        <div style={{ position: "relative" }}>
          <img
            alt="User Profile"
            src={selectedUser?.profilePic || authUser?.profilePic}
            className="user-profile-image"
          />
          <span className={`R ${isOnline ? "online" : "offline"}`}></span>
        </div>
        <h3>{selectedUser?.fullName || authUser?.fullName}</h3>
        <p>{selectedUser?.bio || authUser?.bio}</p>
      </div>
      <hr />
      <div className="media-section">
        <p>Media</p>
        <p
          className="media-link"
          onClick={() => setShowGallery((v) => !v)}
          style={{ cursor: "pointer", color: "#3439db", fontWeight: 500 }}
        >
          contenus multimédias
        </p>
        {showGallery && (
          <div className="gallery">
            {photoBetweenUsers.length === 0 ? (
              <p style={{ color: "#888", fontStyle: "italic" }}>
                Aucune photo échangée.
              </p>
            ) : (
              photoBetweenUsers.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`media-${idx}`}
                  className="gallery-img"
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className="deconnecte">
        <img
          src={authUser?.profilePic || assets.utilisateur}
          alt="Deconnecte"
        />
        <p onClick={logOut} style={{ cursor: "pointer" }}>
          Deconnexion
        </p>
      </div>
    </div>
  );
};

export default RightSideBar;
