import React, { useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const ChatList = ({ chats, setChatList }) => {
  const navigate = useNavigate()

  // icon and delete icon. shown when hovered
  const editChatStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    color: '#fff',
    marginRight: '10px'
  }

  const [hoveredChatIndex, setHoveredChatIndex] = useState(null)
  // mouse event
  const handleMouseEnterChat = (index) => {
    setHoveredChatIndex(index)
  }

  const handleMouseLeaveChat = () => {
    setHoveredChatIndex(null)
  }

  const handleMouseClickChat = (chatID) => {
    navigate(`/chat/${chatID}`)
  }

  const handleMouseClickChatEdit = (chatID) => {
    console.log(`edit chatID: ${chatID}`)
    navigate(`/chat/${chatID}`)
  }
  const handleMouseClickChatDelete = (chatID) => {
    localStorage.removeItem(`MA_chat_${chatID}`)
    console.log(`🚀 delete chatID: ${chatID}`)
    navigate(`/`)
    // setChatList(chats.filter((item) => item.id !== chatID))
  }

  return (
    <div>
      {chats.map((chat, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: hoveredChatIndex === index ? '#82868c' : '#202123',
            borderRadius: '5px'
          }}
          onMouseEnter={() => handleMouseEnterChat(index)}
          onMouseLeave={() => handleMouseLeaveChat()}
          key={chat.id}
        >
          <li
            style={{
              padding: '5px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingRight: '40%'
            }}
            onClick={() => handleMouseClickChat(chat.id)}
          >
            <HiOutlineChatBubbleLeft
              icon={faCircle}
              style={{
                fontSize: '20px',
                margin: '5px 8px'
              }}
            />
            <p
              style={{
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                margin: '5px 0px'
              }}
            >
              {chat.title}
            </p>
          </li>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              color: '#fff',
              marginRight: '10px',
              opacity: index === hoveredChatIndex ? 1 : 0
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: '8px' }}
              onClick={() => handleMouseClickChatEdit(chat.id)}
            />

            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleMouseClickChatDelete(chat.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
