import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../components/SideBar'
import { OpenAiAPI } from '../api/openAiAPI'
import general from '../helper/general'
import { toast } from 'react-toastify'

function ActiveChat() {
  // const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [inputMessage, setInputMessage] = useState(null) // input msg bar
  const [chatConvo, setChatConvo] = useState([]) // array of chat msgs between user and assistant
  const [chatID, setChatID] = useState(null) // id of chat
  const [chatList, setChatList] = useState(null) // array of chat list. Only contains chat id and title
  const [chatData, setChatData] = useState(null) // full data of a chat; id, title, and messages
  const [openAPIToken, setOpenAPIToken] = useState(null) // full data of a chat; id, title, and messages
  const { id } = useParams()
  const navigate = useNavigate()

  async function sendChatToOpenAI(chatDataArr, model) {
    // extract token from local
    const token = JSON.parse(localStorage.getItem('MA_openai_token'))

    const requestBody = {
      model: model, // 'gpt-3.5-turbo',
      messages: chatDataArr,
      stream: false,
      max_tokens: 250
    }

    // call openAI API
    const { data: responseRaw, error } = await general.awaitWrap(
      OpenAiAPI.postChatCompletion(requestBody, token)
    )

    if (error) {
      if (error.code === 'ERR_BAD_REQUEST' && error.response.status === 401) {
        throw new Error('INVALID_TOKEN_ERR')
      } else {
        throw new Error(error.msg)
      }
    }
    const responseObj = responseRaw.data.choices[0].message
    // setInputMessage(responseObj)
    return responseObj
  }

  const createNewChat = () => {
    const chatID = uuidv4()
    const initChat = {
      id: chatID,
      title: 'New Chat',
      messages: [],
      updatedAt: new Date().toISOString()
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

      // if so, do not create chat
      if (latestChatConvo.length === 0) {
        console.log('🚀 You already have an empty chat!')
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

  function appendMessageToChatData(inputMessage) {
    setChatData((prevState) => {
      const messages = [...prevState.messages] // copy previous state
      messages.push(inputMessage)
      return {
        ...prevState,
        messages: messages, // set new state
        updatedAt: new Date().toISOString()
      }
    })
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

  // intermediary state to prevent endless render bug
  // goes to useEffect for 'chatID'
  useEffect(() => {
    setChatID(id)
  }, [id])

  useEffect(() => {
    // fetchAndSetChatList() // required when path goes from / to /:id (useEffect for first render wont run)
    let chatData = []

    if (chatID) {
      // console.log('🚀 chatID:', chatID)
      chatData = JSON.parse(localStorage.getItem(`MA_chat_${chatID}`)) // parse required as data is stored as string
      setChatData(chatData)
      // setChatConvo(chatData?.messages ?? [])
    }
  }, [chatID])

  // init a new chat with the sent message if there is no active chat
  // otherwise, push sent message into existing chat conversation
  useEffect(() => {
    async function processMsgInput() {
      // ensure input message is non-null
      if (inputMessage) {
        if (inputMessage.content.trim() !== '') {
          if (inputMessage.role === 'user') {
            // logging purpose
            console.log('🚀 You said:', inputMessage?.content)
          }

          // get chat data
          const tempChatData = JSON.parse(
            localStorage.getItem(`MA_chat_${chatID}`)
          )

          // return if nil found
          if (!tempChatData) {
            console.log('🚀 Invalid ChatID')
            return
          }

          // append input msg to chat data
          tempChatData.messages.push(inputMessage)
          appendMessageToChatData(inputMessage)

          tempChatData.messages.push(inputMessage)

          // call API
          const { data: responseMessage, error } = await general.awaitWrap(
            sendChatToOpenAI(tempChatData.messages, 'gpt-3.5-turbo')
          )

          if (error) {
            console.log(error)
            toast.error('Invalid OpenAI API Key!', {
              position: 'bottom-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark'
            })
            return
          }

          console.log('🚀 GPT said:', responseMessage)
          tempChatData.messages.push(responseMessage)
          appendMessageToChatData(responseMessage)
        }
      }
    }

    processMsgInput()
  }, [inputMessage])

  // update local storage and re-render chatlist
  useEffect(() => {
    // make sure all data is present
    if (chatData && chatID) {
      // update local storage
      localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(chatData))

      setChatConvo(chatData?.messages ?? [])

      // fetch chat list if active chat is not the most recent
      if (chatList.length > 0) {
        if (chatList[0].id !== chatID) {
          fetchAndSetChatList()
        }
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
            height: '10%',
            boxShadow: '0 5px 5px -5px rgba(0, 0, 0, 0.25)'
          }}
        >
          <blockquote
            style={{
              overflowY: 'auto',
              maxHeight: '50px',
              maxWidth: '70%',
              padding: '5px 0px'
            }}
          >
            {quote}
          </blockquote>
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
          <ChatConversation
            chatConvo={chatConvo.length === 0 ? [] : chatConvo}
            setchatConvo={setChatConvo}
          />

          {/* input text bar */}
          {!chatID && (
            <button
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#0033aa',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.2rem',
                marginTop: '5rem',
                cursor: 'pointer'
              }}
              onClick={onClickNewChat}
            >
              New Chat
            </button>
          )}
          {chatID && <ChatInputBar setInputMessage={setInputMessage} />}
        </div>
      </div>
    </div>
  )
}

export default ActiveChat
