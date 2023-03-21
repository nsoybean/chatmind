import React from 'react'
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
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 3,
        flexDirection: 'column',
        justifyContent: 'center', // main axis (vertically)
        alignItems: 'center', // cross axis (horizontally)
        height: '100%',
        backgroundColor: '#f8f7fe'
      }}
    >
      <ChatConversation messages={mockMessages} />
      {/* <div style={{ justifySelf: 'flex-end' }}> */}
      <ChatInputBar />
      {/* </div> */}
    </div>
  )
}

export default NewChat
