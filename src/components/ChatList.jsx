import React, { useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  }
  const handleMouseClickChatDelete = (chatID) => {
    console.log(`delete chatID: ${chatID}`)
    localStorage.removeItem(`mindAI_chat_${chatID}`)
    setChatList(chats.filter((item) => item.id !== chatID))
  }

  // reverse chats from latest to oldest
  const reversedChats = chats.slice().reverse()

  return (
    <div>
      {reversedChats.map((chat, index) => (
        <div key={chat.id}>
          <li
            style={{
              padding: '5px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor:
                hoveredChatIndex === index ? '#82868c' : '#202123',
              borderRadius: '5px'
            }}
            onClick={() => handleMouseClickChat(chat.id)}
            onMouseEnter={() => handleMouseEnterChat(index)}
            onMouseLeave={() => handleMouseLeaveChat()}
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
          </li>
        </div>
      ))}
    </div>
  )
}

export default ChatList
