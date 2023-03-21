import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'

const mockMessages = [
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  },
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  }
]
function NewChat() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(`${data.content} - ${data.author}`))
      .catch((error) => {
        console.error(
          'Error fetching random quote from https://api.quotable.io/random:',
          error
        )
        setQuote(
          'If you cannot do great things, do small things in a great way - Napoleon Hill'
        )
      })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start', // main axis (vertically)
        alignItems: 'center', // cross axis (horizontally)
        height: '100%',
        backgroundColor: '#f8f7fe'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '70px',
          boxShadow: '0 5px 5px -5px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div
          style={{
            maxWidth: '70%',
            overflowY: 'auto',
            maxHeight: '80%'
          }}
        >
          <blockquote>{quote}</blockquote>
        </div>
      </div>
      <ChatConversation messages={mockMessages} />
      <ChatInputBar />
    </div>
  )
}

export default NewChat
