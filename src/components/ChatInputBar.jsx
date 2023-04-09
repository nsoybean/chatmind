import React, { useState, useContext } from 'react'
import { FaPaperPlane } from 'react-icons/fa' // import send icon
import TextField from '@mui/material/TextField'
import { Context } from '../context/token'

const ChatInputBar = ({ setInputMessage }) => {
  // const [input, setInput] = useState('') // define state for message input

  // global use context
  const { chatInput, setChatInput } = useContext(Context)

  async function handleSend() {
    const messageObj = { role: 'user', content: chatInput }
    setInputMessage(messageObj)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      handleSend()
      setChatInput('') // clear input after sending
    }
  }

  return (
    <div
      style={{
        // position: 'fixed',
        // bottom: 0,
        maxWidth: '60%',
        // height: 'auto',
        width: '60%',
        // marginTop: '15px', // not need as margin is done in parent component
        // marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: '#f8f7fe'
      }}
    >
      <TextField
        className='darkmode-ignore'
        id='outlined-multiline-flexible'
        placeholder='Type your message here'
        multiline
        maxRows={4}
        fullWidth
        size='small'
        value={chatInput}
        autoFocus={true}
        onChange={(e) => setChatInput(e.target.value)} // update message input state on change event
        onKeyDown={handleKeyDown} // add onKeyDown event listener to input field
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '5x',
              borderColor: '2px #0b5fe9'
            },
            '&:hover fieldset': {
              borderColor: '2px #0b5fe9'
            },
            '&.Mui-focused fieldset': {
              borderColor: '2px #0b5fe9'
            }
          }
        }}
        style={{
          marginRight: '5px'
        }}
      />

      {/* send button */}
      <button
        className='darkmode-ignore'
        type='button'
        onClick={handleSend} // call handleSend function on send button click
        style={{
          backgroundColor: '#0b5fe9', // blue background color
          color: 'white', // white text color
          border: 'none', // remove border
          borderRadius: '5px', // rounded radius to match text input
          padding: '12px', // add some padding
          display: 'flex', // make sure send icon is aligned with text input
          alignItems: 'center', // vertically center send icon
          height: '40px',
          width: '100px',
          cursor: 'pointer' // show pointer cursor when hovering over button
        }}
      >
        <FaPaperPlane style={{ marginRight: '8px' }} /> Send
      </button>
    </div>
  )
}

export default ChatInputBar
