import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useNavigate, useParams } from 'react-router-dom'
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
    console.log('🚀 fetching chats from storage')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      // only extract chat-related data from local storage
      if (key.includes('MA_chat')) {
        const chatDataTemp = JSON.parse(localStorage.getItem(key))
        const chatTitleObj = {
          id: chatDataTemp.id,
          title: chatDataTemp.title,
          updatedAt: chatDataTemp.updatedAt
        }
        tempChatList.push(chatTitleObj)
      }
    }

    // if there are no chats or no data in local storage
    if (tempChatList.length === 0 || localStorage.length === 0) {
      console.log('🚀 no chat found in local storage')
    }

    // sort tempChatList according to chat's updatedAt timestamp
    tempChatList.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    setChatList(tempChatList)
  }

  useEffect(() => {
    // setOpenAPIToken(
    // JSON.parse(localStorage.getItem('MA_chat_openai_token')) ?? null
    // )
    console.log('first render')
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
  // goes to useEffect for 'chatID'
  useEffect(() => {
    setChatID(id)
  }, [id])

  useEffect(() => {
    fetchAndSetChatList() // required when path goes from / to /:id (useEffect for first render wont run)

    let chatData = []

    if (chatID) {
      console.log('🚀 chatID:', chatID)
      chatData = JSON.parse(localStorage.getItem(`MA_chat_${chatID}`)) // parse required as data is stored as string
      setChatData(chatData)
      // console.log('🚀 chatData:', chatData)
      setChatConvo(chatData?.messages ?? [])
    } else {
      // if root directory, init empty chat
      // reset
      setChatData(null)
      setChatConvo([])
    }
  }, [chatID])

  // init a new chat with the sent message if there is no active chat
  // otherwise, push sent message into existing chat conversation
  useEffect(() => {
    // new sent message
    if (sentMessage) {
      // logging purpose
      if (sentMessage.role === 'user') {
        console.log('🚀 You said:', sentMessage?.content)
      } else {
        console.log('🚀 GPT said:', sentMessage?.content)
      }

      // if path is root
      // prevent re-rendering of child component 'ChatConversation' to pass null 'sendMessage' prop out and getting appended to 'chatConvo' state
      if (!chatID) {
        const chatID = uuidv4()
        const initChat = {
          id: chatID,
          title: 'New Chat',
          messages: [sentMessage],
          updatedAt: new Date().toISOString()
        }
        console.log('🚀 init new chat:', chatID)

        // init on local storage
        localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(initChat))

        navigate(`/chat/${chatID}`)
      } else {
        // check and return if chatID is not valid
        if (!localStorage.getItem(`MA_chat_${chatID}`)) {
          console.log('🚀 Invalid ChatID')
          return
        }

        setChatData((prevState) => {
          const messages = [...prevState.messages] // copy previous state
          messages.push(sentMessage)
          return {
            ...prevState,
            messages, // set new state
            updatedAt: new Date().toISOString()
          }
        })

        setChatConvo([...chatConvo, sentMessage])
      }
    }
  }, [sentMessage])

  // update local storage and re-render chatlist
  useEffect(() => {
    // make sure all data is present
    if (chatData && chatID && sentMessage) {
      // update local storage
      localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(chatData))

      // fetch chat list from local storage if current active chatID is not at the top of chat list
      if (chatList[0].id !== chatID) {
        fetchAndSetChatList()
      }
    }
  }, [chatData])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh'
      }}
    >
      <Sidebar
        style={{ flex: '0 0 auto', width: '300px' }}
        chatList={chatList}
        setChatList={setChatList}
      />
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
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
              // maxWidth: '90%',
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
