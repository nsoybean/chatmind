import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function ActiveChat() {
  const [quote, setQuote] = useState('')
  const [sentMessage, setSentMessage] = useState(null)
  const [chatConvo, setChatConvo] = useState([])

  // get chat ID and get chat message from local storage
  const location = useLocation()
  const chatID = new URLSearchParams(location.search).get('id')

  let chatData = []
  // if specific chat is queried
  if (chatID) {
    console.log('🚀 ActiveChat ~ chatID:', chatID)
    chatData = JSON.parse(localStorage.getItem(`mindAI_chat_${chatID}`)) // parse required as data is stored as string
    setChatConvo(chatData)
    console.log('🚀 ActiveChat ~ chatData:', chatData)
  } else {
    // root directory, init empty chat
    console.log('🚀 ActiveChat ~ /chatID:', chatID)
  }

  // init a new chat with the sent message if there is no active chat
  // otherwise, push sent message into existing chat conversation
  useEffect(() => {
    console.log('sent message:', sentMessage)

    // new chat
    if (!chatID) {
      if (sentMessage) {
        const chatID = uuidv4()
        const initChat = { id: chatID, title: 'New Chat', messages: [] }
        // push to local storage
        localStorage.setItem(`mindAI_chat_${chatID}`, JSON.stringify(initChat))

        // push to chatConvo for render
        setChatConvo([...chatConvo, { role: 'user', content: sentMessage }])
      }
    } else {
      // existing chat
    }
  }, [sentMessage])

  useEffect(() => {
    console.log('🚀 ActiveChat ~ chatConvo:', chatConvo)
  }, [chatConvo])

  useEffect(() => {
    // get quote of the day
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
      {/* section at the top of page to show quotes, chatGPT usage */}
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
        <blockquote
          style={{
            maxWidth: '70%',
            overflowY: 'auto',
            maxHeight: '50px',
            padding: '5px 0px'
          }}
        >
          {quote}
        </blockquote>
      </div>

      {/* chat conversation text bubbles */}
      <ChatConversation
        chatConvo={chatConvo ?? []}
        setchatConvo={setChatConvo}
      />

      {/* input text bar */}
      <ChatInputBar setSentMessage={setSentMessage} />
    </div>
  )
}

export default ActiveChat
