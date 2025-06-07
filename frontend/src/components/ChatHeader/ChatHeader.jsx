import React from 'react'
import { useChatStore } from "../../store/useChatStore";
import { assets } from "../../assets/assets";
const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = useChatStore();
  return (
    <div>
      <div className="chat_user">
              <div style={{ position: "relative" }}>
                <img src={ selectedUser?.profilePic || assets.utilisateur} alt="User Profile" />
                <div className="status"></div>
              </div>
              <div>
                <p>{selectedUser?.fullName || "User"}</p>
                <span>En ligne</span>
              </div>
              <div className="chatuserh" >
                <img src={assets.x} alt="Help Icon"  onClick={()=>{setSelectedUser(null)}}/>
              </div>
            </div>
    </div>
  )
}

export default ChatHeader
