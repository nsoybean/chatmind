import React, { useState, useEffect, useContext } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../components/SideBar'
import { OpenAiAPI } from '../api/openAiAPI'
import { AwesomeButton } from 'react-awesome-button'
import '../styles/awesomeButton/styles.css'
import TokenModal from '../components/TokenModal'
import { Context } from '../context/token'
import LoginModal from '../components/LoginModal'
import { FaUser } from 'react-icons/fa'

function Home() {
  const [quote, setQuote] = useState(null)
  const [sentMessage, setSentMessage] = useState(null) // input msg bar
  const [chatConvo, setChatConvo] = useState([]) // array of chat msgs between user and assistant
  const [chatID, setChatID] = useState(null) // id of chat
  const [chatList, setChatList] = useState(null) // array of chat list. Only contains chat id and title
  const [chatData, setChatData] = useState(null) // full data of a chat; id, title, and messages
  const [validatedToken, setValidatedToken] = useState(null)
  const navigate = useNavigate()
  const [profileIconHovered, setProfileIconHovered] = useState(null)
  const [profileModal, setProfileModal] = useState(false)

  const { openAiToken, session } = useContext(Context)

  const createNewChat = () => {
    const chatID = uuidv4()
    const initChat = {
      id: chatID,
      title: 'MindAI Chat',
      messages: [],
      updatedAt: new Date().toISOString(),
      model: 'gpt-3.5-turbo', // default
      temperature: 0.7, // default
      maxToken: 4096
    }
    localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(initChat))
    console.log('🚀 New chat initiated:', chatID)

    // navigate
    navigate(`/chat/${chatID}`)
  }

  async function onClickNewChat() {
    // create new chat is there is no chats
    if (chatList.length === 0) {
      createNewChat()
    } else {
      // else determine if latest chat is empty
      const latestChatID = chatList[0].id
      const latestChatConvo = JSON.parse(
        localStorage.getItem(`MA_chat_${latestChatID}`)
      ).messages

      // navigate to unsed chat
      if (latestChatConvo.length === 0) {
        console.log('🚀 From /, You already have an empty chat!')
        navigate(`/chat/${latestChatID}`)
      } else {
        // otherwise, create chat
        createNewChat()
      }
    }
  }

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

  function toggleProfileModal() {
    setProfileModal(!profileModal)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh'
      }}
    >
      <Sidebar
        style={{ minWidth: '30px' }}
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
          // height: '100%',
          backgroundColor: '#f8f7fe'
        }}
      >
        {/* TOP BAR */}
        {/* QUOTE */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxHeight: '10%',
            marginBottom: '5px',
            boxShadow: '0 5px 5px -5px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              justifySelf: 'center',
              overflow: 'auto',
              maxHeight: '80%',
              maxWidth: '70%',
              padding: '5px 0px',
              margin: '10px 5px'
            }}
          >
            {quote}
          </div>

          {/* LOGIN ICON */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: '90%',
              cursor: 'pointer'
            }}
            onClick={toggleProfileModal}
            onMouseEnter={() => setProfileIconHovered(true)}
            onMouseLeave={() => setProfileIconHovered(false)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: profileIconHovered ? '42px' : '40px',
                width: profileIconHovered ? '42px' : '40px',
                borderRadius: '100%',
                // backgroundColor: profileIconHovered ? '#3b71ca' : '#fff', // white default, hovered blue
                backgroundColor: profileIconHovered ? '#2c5aa4' : '#3b71ca', // dark-grey default, hovered black}}>
                marginRight: '5px'
              }}
            >
              <FaUser size={20} style={{ color: 'white' }} />
            </div>
            <div>
              {session ? <strong> Profile</strong> : <strong>Login</strong>}
            </div>
          </div>

          {profileModal && (
            <LoginModal
              showModel={profileModal}
              setShowModal={setProfileModal}
              session={session}
            />
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // main axis (vertically)
            alignItems: 'center', // cross axis (horizontally)
            height: '100%',
            width: '100%'
          }}
        >
          {/* chat conversation text bubbles */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '5%'
            }}
          >
            <ChatConversation
              chatConvo={chatConvo.length === 0 ? [] : chatConvo}
              setchatConvo={setChatConvo}
            />
          </div>
          {/* new chat button */}

          <div style={{ marginTop: '5%' }}>
            {openAiToken ? (
              <AwesomeButton
                size='medium'
                type='primary'
                onPress={onClickNewChat}
              >
                New Chat
              </AwesomeButton>
            ) : (
              <TokenModal text='Enter OpenAI API Key' />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
