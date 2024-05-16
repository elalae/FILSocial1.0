import React from 'react'
import Avatar from '../alert/Avatar'

const MsgDisplay = ({user}) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar}  />
        <span>{user.username}</span>
      </div>

      <div className = "chat_text">
        Some random text I wrote to test this.
      </div>

      <div className = "chat_time">
        May 2024
      </div>
    </>
  )
}

export default MsgDisplay
