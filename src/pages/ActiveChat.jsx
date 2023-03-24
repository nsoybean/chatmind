import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../components/SideBar'

function ActiveChat() {
  // const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [sentMessage, setSentMessage] = useState(null) // input msg bar
  const [chatConvo, setChatConvo] = useState([]) // array of chat msgs between user and assistant
  const [chatID, setChatID] = useState(null) // id of chat
  const [chatList, setChatList] = useState(null) // array of chat list. Only contains chat id and title
  const [chatData, setChatData] = useState(null) // full data of a chat; id, title, and messages
  const [openAPIToken, setOpenAPIToken] = useState(null) // full data of a chat; id, title, and messages
  const { id } = useParams()
  const navigate = useNavigate()

  function fetchAndSetChatList() {
    // fetch all chats from local storage
    let tempChatList = []
    console.log('🚀 looking through local storage')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      // only extract chat-related data from local storage
      if (key.includes('MA_chat')) {
        const chatDataTemp = JSON.parse(localStorage.getItem(key))
        const chatTitleObj = { id: chatDataTemp.id, title: chatDataTemp.title }
        tempChatList.push(chatTitleObj)
      }
    }

    // if there are no chats or no data in local storage
    if (tempChatList.length === 0 || localStorage.length === 0) {
      console.log('🚀 no chat found in local storage')
      // const chatID = uuidv4()
      // const initChat = { id: chatID, title: 'New Chat', messages: [] }
      // push to local storage
      // localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(initChat))

      // push to tempChatList for render
      // tempChatList.push(initChat)
    }

    // navigate(`/chat?id=${tempChatList[0].id}`)
    setChatList(tempChatList)
  }

  useEffect(() => {
    setOpenAPIToken(
      JSON.parse(localStorage.getItem('MA_chat_openai_token')) ?? null
    )

    fetchAndSetChatList()

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

  // intermediary state to prevent endless render bug
  useEffect(() => {
    setChatID(id)
  }, [id])

  useEffect(() => {
    fetchAndSetChatList()

    let chatData = []

    if (chatID) {
      console.log('🚀 Active chatID:', chatID)
      chatData = JSON.parse(localStorage.getItem(`MA_chat_${chatID}`)) // parse required as data is stored as string
      console.log('🚀 ChatData:', chatData)
      setChatData(chatData)
      setChatConvo(chatData?.messages ?? [])
    } else {
      // root directory, init empty chat
      console.log('🚀 No active chat')
    }
  }, [chatID])

  // init a new chat with the sent message if there is no active chat
  // otherwise, push sent message into existing chat conversation
  useEffect(() => {
    console.log('🚀 ActiveChat ~ sentMessage:', sentMessage)

    // new sent message
    if (sentMessage) {
      // prevent re-rendering of child component 'ChatConversation' to pass null 'sendMessage' prop out and getting appended to 'chatConvo' state
      if (!chatID) {
        const chatID = uuidv4()
        const initChat = {
          id: chatID,
          title: 'New Chat',
          messages: [{ role: 'user', content: sentMessage }]
        }
        console.log('🚀 init new chat:', chatID)

        // init on local storage
        localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(initChat))

        navigate(`/chat/${chatID}`) // will re-render
      } else {
        console.log('🚀 push msg to active chat', chatID)

        // existing chat
        // push to chat in local storage
        // const chatData = JSON.parse(
        //   localStorage.getItem(`MA_chat_${chatID}`)
        // )
        // // append new sent message to chatData
        // console.log(
        //   '🚀 ~ file: ActiveChat.jsx:71 ~ useEffect ~ chatData:',
        //   chatData
        // )

        // setChatData(...chatData, chatData.messages.push())

        setChatData((prevState) => {
          const messages = [...prevState.messages] // copy previous state
          messages.push({ role: 'user', content: sentMessage })
          return {
            ...prevState,
            messages // set new state
          }
        })

        // re-render convo
        setChatConvo([...chatConvo, { role: 'user', content: sentMessage }])
      }
    }
  }, [sentMessage])

  // update local storage
  useEffect(() => {
    if (chatData && chatID) {
      localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(chatData))
    }
  }, [chatData])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '100vh'
      }}
    >
      <Sidebar chatList={chatList} setChatList={setChatList} />
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
          chatConvo={chatConvo.length === 0 ? [] : chatConvo}
          setchatConvo={setChatConvo}
        />

        {/* input text bar */}
        <ChatInputBar setSentMessage={setSentMessage} />
      </div>
    </div>
  )
}

export default ActiveChat
