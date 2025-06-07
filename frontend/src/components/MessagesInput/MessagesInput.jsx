import React from 'react'
import { assets } from '../../assets/assets';
const MessagesInput = () => {
  return (
    <div className="chat_message">
                <input type="text " placeholder="send a message" />
                <input type="file " id="img" accept="image/png , image/jpeg" hidden />
                <div className="img"></div>
                <label htmlFor="image">
                  <img src={assets.image} alt="" height={30} width={30} />
                </label>
                <img src={assets.dm} alt="" height={30} width={30} className="dm" />
     </div>
  )
}

export default MessagesInput
