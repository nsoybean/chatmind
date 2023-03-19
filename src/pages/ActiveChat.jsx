import React from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'

const mockMessages = [
  { sender: 'CHATGPT', msg: 'Hi how may i help you?' },
  { sender: 'USER', msg: 'I need help with this and that' },
  {
    sender: 'USER',
    msg: 'Please give me a solution! This is a very long paragraph that does not mean anything rather than making things extremely long and windy'
  }
]
function NewChat() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // main axis (vertically)
        alignItems: 'center', // cross axis (horizontally)
        height: '100vh',
        width: '100%',
        backgroundColor: '#f8f7fe'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Active Chat UI</h1>
      <ChatConversation messages={mockMessages} />
      <ChatInputBar />
    </div>
  )
}

export default NewChat
