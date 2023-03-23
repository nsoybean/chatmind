import React, { useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const ChatList = ({ chats }) => {
  // TODO: to prevent this component from re-rendering when a chat is hovered
  const [hoveredChat, setHoveredChat] = useState(null)

  // mouse event
  const handleMouseEnterChat = (index) => {
    setHoveredChat(index)
  }

  const handleMouseLeaveChat = () => {
    setHoveredChat(null)
  }
  return (
    <div>
      {chats.map((chat, index) => (
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
              backgroundColor: hoveredChat === index ? '#82868c' : '#202123',
              borderRadius: '5px'
            }}
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

            {/* temp commented out 
          TODO: implement edit chat title */}
            {/* <div style={editChatStyle}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '8px' }} />
          <FontAwesomeIcon icon={faTrash} />
        </div> */}
          </li>
        </div>
      ))}
    </div>
  )
}

export default ChatList
