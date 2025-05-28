import React, { useState } from "react";
import "./UpdateProfile.css";
import { assets } from "../../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";

const ProfileUpdates = () => {
  const { authUser , ProfileUpdate } = useAuth();
  const Navigate = useNavigate();
  const [profilePic, SetprofilePic] = useState(assets.utilisateur);
  const [Values, SetValues] = useState({
    bio: "hello ! this is my bio",
    profilePic: assets.utilisateur,
  });

  const HandleChange = (e) => {
    SetValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSave = async (e) => {
    e.preventDefault();
    console.log("handleSave called with values:", Values);
    await ProfileUpdate(Values);
    Navigate("/");
    console.log("Profile updated successfully");
    
  };

  const HandleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return; 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      SetprofilePic(base64String);
      SetValues({
        ...Values,
        profilePic: base64String,
      });
    };
  };

  return (
    <div className="profileUpdate">
      <div className="profile_container">
        <form onSubmit={HandleSave}>
          <div className="profile_header">
            <h1>Update Profile</h1>
            <label htmlFor="avatar">
              <img src={profilePic} alt="Avatar" />
              <p>Upload Image</p>
            </label>
            <input
              name="avatar"
              type="file"
              onChange={HandleImageChange}
              id="avatar"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="input">
            <input
              name="userName"
              type="text"
              value={authUser?.fullName}
              readOnly
              placeholder="Name"
            />
            <textarea
              name="bio"
              value={Values.bio}
              onChange={HandleChange}
              placeholder="Write a portfolio bio"
            />
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdates;