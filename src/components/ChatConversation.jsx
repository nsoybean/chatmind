import React, { useState, useMemo } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import chatmindLogo from '../assets/chatmind.png'
import MindAiTitle from '../components/MindAiTitle'
import FeatureList from '../components/FeatureList'

const ChatConversation = ({ chatConvo, setChatConvo }) => {
  const [hoveredChat, setHoveredChat] = useState(null)
  // const [chatMessages, setChatMessages] = useState(messages)

  const handleMouseEnter = (index) => {
    setHoveredChat(index)
  }

  const handleMouseLeave = () => {
    setHoveredChat(null)
  }

  const handleEdit = (index, editedMessage) => {
    const newMessages = [...chatConvo]
    newMessages[index] = editedMessage
    setChatConvo(newMessages)
  }

  const handleDelete = (index) => {
    const newMessages = chatConvo.filter((message, i) => i !== index)
    setChatConvo(newMessages)
  }

  return (
    <div
      style={{
        width: '70%',
        overflow: 'auto',
        maxHeight: '80vh', // set a height to make sure the div doesn't expand infinitely
        flexDirection: 'column-reverse', // this scrolls chat to the bottom by default
        display: 'flex'
      }}
    >
      {/* !!! components are layed out in reverse as flex-direction is column-reverse */}
      {/* rendering of conversation in text bubbles */}
      {/* reverse chat as chat convo is col-reverse */}
      {chatConvo
        .slice()
        .reverse()
        .map((chat, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              // USER AND CHATGPT CHAT RENDERED ON RIGHT AND LEFT RESPECTIVELY
              justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'start' // vertically align logo and text
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {chat.role === 'assistant' ? (
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
                backgroundColor: chat.role === 'user' ? '#3b82f6' : 'white',
                color: chat.role === 'user' ? 'white' : 'black',
                padding: '10px',
                borderRadius: '15px',
                // width: 'fit-content',
                maxWidth: '80%', // chat bubble not taking up full width
                margin: '8px 0px'
              }}
            >
              {chat.content}
            </p>
            {chat.role === 'user' ? (
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

      {/* feature list */}
      <FeatureList />

      {/* brand */}
      <MindAiTitle />
    </div>
  )
}

export default ChatConversation
