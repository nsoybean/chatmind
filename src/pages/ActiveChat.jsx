import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function ActiveChat() {
  // const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [sentMessage, setSentMessage] = useState(null)
  const [chatConvo, setChatConvo] = useState([])
  const [chatID, setChatID] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    setChatID(id)
  }, [id])

  useEffect(() => {
    let chatData = []

    if (chatID) {
      console.log('🚀 ActiveChat ~ chatID:', chatID)
      chatData = JSON.parse(localStorage.getItem(`mindAI_chat_${chatID}`)) // parse required as data is stored as string
      console.log('🚀 ActiveChat ~ chatData:', chatData)
      setChatConvo(chatData.messages)
    } else {
      // root directory, init empty chat
      console.log('🚀 ActiveChat ~ /chatID:', chatID)
    }
  }, [chatID])

  // first render
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

  // init a new chat with the sent message if there is no active chat
  // otherwise, push sent message into existing chat conversation
  useEffect(() => {
    console.log('🚀 ActiveChat ~ sentMessage:', sentMessage)

    // new sent message
    if (sentMessage) {
      // prevent re-rendering of child component 'ChatConversation' to pass null 'sendMessage' prop out and getting appended to 'chatConvo' state
      if (!chatID) {
        console.log('🚀 ActiveChat ~ its a new chat')

        const chatID = uuidv4()
        console.log(
          '🚀 ~ file: ActiveChat.jsx:57 ~ useEffect ~ chatID:',
          chatID
        )
        const initChat = {
          id: chatID,
          title: 'New Chat',
          messages: [{ role: 'user', content: sentMessage }]
        }
        // init on local storage
        localStorage.setItem(`mindAI_chat_${chatID}`, JSON.stringify(initChat))
        // push to chatConvo for render
        setChatConvo([{ role: 'user', content: sentMessage }])
      } else {
        console.log('🚀 ActiveChat ~ its an existing chat')
        // existing chat
        // push to chat in local storage
        const chatData = JSON.parse(
          localStorage.getItem(`mindAI_chat_${chatID}`)
        )
        // append new sent message to chatData
        console.log(
          '🚀 ~ file: ActiveChat.jsx:71 ~ useEffect ~ chatData:',
          chatData
        )
        chatData.messages.push({ role: 'user', content: sentMessage })
        localStorage.setItem(`mindAI_chat_${chatID}`, JSON.stringify(chatData))
        // push to chatConvo for render
        setChatConvo([...chatConvo, { role: 'user', content: sentMessage }])
      }
    }
  }, [sentMessage])

  // // update chat in local storage whenever chat convo is updated
  // useEffect(() => {

  //   console.log('🚀 ActiveChat ~ chatConvo:', chatConvo)
  // }, [chatConvo])

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
