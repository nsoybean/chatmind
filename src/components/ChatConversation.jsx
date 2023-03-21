import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import chatmindLogo from '../assets/chatmind.png'

const ChatConversation = ({ messages }) => {
  const [hoveredChat, setHoveredChat] = useState(null)
  const [chatMessages, setChatMessages] = useState(messages)

  const handleMouseEnter = (index) => {
    setHoveredChat(index)
  }

  const handleMouseLeave = () => {
    setHoveredChat(null)
  }

  const handleEdit = (index, editedMessage) => {
    const newMessages = [...chatMessages]
    newMessages[index] = editedMessage
    setChatMessages(newMessages)
  }

  const handleDelete = (index) => {
    const newMessages = chatMessages.filter((message, i) => i !== index)
    setChatMessages(newMessages)
  }

  return (
    <div
      style={{
        maxWidth: '70%',
        overflow: 'auto',
        maxHeight: '80vh' // set a height to make sure the div doesn't expand infinitely
      }}
    >
      {chatMessages.map((message, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            // USERS AND CHATGPT CHAT RENDERED ON RIGHT AND LEFT RESPECTIVELY
            justifyContent:
              message.sender === 'USER' ? 'flex-end' : 'flex-start',
            alignItems: 'start' // vertically align logo and text
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {message.sender === 'CHATGPT' ? (
            <img
              src={chatmindLogo}
              alt='chatGPT'
              style={{ margin: '8px 8px', width: '36px', height: '36px' }}
            />
          ) : (
            ''
          )}

          <p
            style={{
              backgroundColor: message.sender === 'USER' ? '#3b82f6' : 'white',
              color: message.sender === 'USER' ? 'white' : 'black',
              padding: '10px',
              borderRadius: '15px',
              // width: 'fit-content',
              maxWidth: '80%', // chat bubble not taking up full width
              margin: '8px 0px'
            }}
          >
            {message.msg}
          </p>
          {message.sender === 'USER' ? (
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderRadius: '20%',
                margin: '8px 8px',
                padding: '8px',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              <FaUserAlt size={16} color='#808080' />
            </div>
          ) : (
            ''
          )}
          {/* temp comment out edit and delete button */}
          {/* {hoveredChat === index && (
            <div>
              <button onClick={() => handleEdit(index, 'edited message')}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )} */}
        </div>
      ))}
    </div>
  )
}

export default ChatConversation
