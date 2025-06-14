import React from 'react'
import { useChatStore } from "../../store/useChatStore";
import { assets } from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = useChatStore();
  const { OnLineUsers } = useAuthStore();
  return (
    <div>
      <div className="chat_user">
              <div style={{ position: "relative" }}>
                <img src={ selectedUser?.profilePic || assets.utilisateur} alt="User Profile" />
                <span className={`status ${OnLineUsers.includes(selectedUser?._id) ? "online" : "offline"}`}></span>
              </div>
              <div className="chatuserp">
                <p>{selectedUser?.fullName || "User"}</p>
               
              </div>
              <div className="chatuserh" >
                <img src={assets.x} alt="Help Icon"  onClick={()=>{setSelectedUser(null)}}/>
              </div>
            </div>
    </div>
  )
}

export default ChatHeader
