import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa' // import send icon

const ChatInputBar = ({ setInputMessage }) => {
  const [input, setInput] = useState('') // define state for message input

  async function handleSend() {
    const messageObj = { role: 'user', content: input }
    setInputMessage(messageObj)
    setInput('') // clear input after sending
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
        maxWidth: '50%',
        width: '50%',
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
        value={input}
        onChange={(e) => setInput(e.target.value)} // update message input state on change event
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
