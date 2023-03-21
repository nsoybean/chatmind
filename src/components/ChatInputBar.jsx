import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa' // import send icon

const ChatInputBar = () => {
  const [message, setMessage] = useState('') // define state for message input

  const handleSend = () => {
    // handle logic for send button
    console.log(`Sending message: ${message}`)
    setMessage('') // clear message input after sending
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        maxWidth: '60%',
        width: '70%',
        marginTop: '15px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      <input
        type='text'
        placeholder='Type your message here'
        value={message}
        onChange={(e) => setMessage(e.target.value)} // update message input state on change event
        onKeyDown={handleKeyDown} // add onKeyDown event listener to input field
        style={{
          flex: 1, // expand input to fill available space
          border: '1px solid #ccc', // grey border
          borderRadius: '20px', // rounded radius
          padding: '12px', // add some padding
          marginRight: '8px', // add some margin to make space for the send button
          overflowWrap: 'break-word', // break long words onto a new line
          height: 'auto', // allow input to expand/contract based on amount of text
          maxHeight: '100px',
          fontSize: '16px'
        }}
      />
      {/* send button */}
      <button
        type='button'
        onClick={handleSend} // call handleSend function on send button click
        style={{
          backgroundColor: '#0033aa', // blue background color
          color: 'white', // white text color
          border: 'none', // remove border
          borderRadius: '20px', // rounded radius to match text input
          padding: '12px', // add some padding
          display: 'flex', // make sure send icon is aligned with text input
          alignItems: 'center', // vertically center send icon
          cursor: 'pointer' // show pointer cursor when hovering over button
        }}
      >
        <FaPaperPlane style={{ marginRight: '8px' }} /> Send
      </button>
    </div>
  )
}

export default ChatInputBar
