import React, { useState } from 'react'

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
        maxWidth: '70%'
      }}
    >
      {chatMessages.map((message, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            // USERS AND CHATGPT CHAT RENDERED ON RIGHT AND LEFT RESPECTIVELY
            justifyContent:
              message.sender === 'USER' ? 'flex-end' : 'flex-start'
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <p
            style={{
              backgroundColor: message.sender === 'USER' ? '#3b82f6' : 'white',
              color: message.sender === 'USER' ? 'white' : 'black',
              padding: '10px',
              borderRadius: '15px',
              width: 'fit-content',
              margin: '8px 0px'
            }}
          >
            {message.msg}
          </p>
          {hoveredChat === index && (
            <div>
              <button onClick={() => handleEdit(index, 'edited message')}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ChatConversation
