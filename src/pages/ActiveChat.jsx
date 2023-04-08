import React, { useState, useEffect } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../components/SideBar'
import { OpenAiAPI } from '../api/openAiAPI'
import general from '../helper/general'
import { toast } from 'react-toastify'
import ConfigureChatButton from '../components/ConfigureChatButton'
import PromptButton from '../components/PromptButton'
import CancelAPIButton from '../components/CancelAPIButton'
import axios from 'axios'

function ActiveChat() {
  // const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [inputMessage, setInputMessage] = useState(null) // input msg bar
  const [chatConvo, setChatConvo] = useState([]) // array of chat msgs between user and assistant
  const [chatID, setChatID] = useState(null) // id of chat
  const [chatList, setChatList] = useState(null) // array of chat list. Only contains chat id and title
  const [chatData, setChatData] = useState(null) // full data of a chat; id, title, and messages
  const [openAPIToken, setOpenAPIToken] = useState(null) // full data of a chat; id, title, and messages
  const [cancelToken, setCancelToken] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  async function sendChatToOpenAI(chatData) {
    // extract token from local
    const token = JSON.parse(localStorage.getItem('MA_openai_token'))

    const requestBody = {
      model: chatData.model,
      messages: chatData.messages,
      temperature: chatData.temperature,
      stream: false
      // max_tokens: chatData.maxToken //empty
    }

    // call openAI API
    let tempCancelToken = axios.CancelToken.source()
    setCancelToken(tempCancelToken)
    const { data: responseRaw, error } = await general.awaitWrap(
      OpenAiAPI.postChatCompletion(requestBody, token, tempCancelToken)
    )

    if (error) {
      if (
        error.code === 'ERR_BAD_REQUEST' &&
        error.message === 'Request failed with status code 401'
      ) {
        throw new Error('INVALID_TOKEN_ERR')
      } else {
        throw new Error(error.message)
      }
    }
    const responseObj = responseRaw.data.choices[0].message
    // setInputMessage(responseObj)
    return responseObj
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
            sendChatToOpenAI(tempChatData)
          )

          // set cancel to false if API completes
          setCancelToken(null)

          if (error) {
            // show toast only for invalid API token
            if (error.message === 'INVALID_TOKEN_ERR') {
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
            }

            // return for all errors
            return
          }

          console.log('🚀 GPT said:', responseMessage?.content)
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
      // uncomment for debugging
      // console.log('🚀 ActiveChat ~ chatData:', chatData)

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

  // set cancel to false if user initiated API cancel
  function onCancelAPI() {
    // only allow if there is an ongoing API
    if (cancelToken) {
      cancelToken.cancel('Cancelled API Request') // err msg in promise's error.message
    }
    // reset (so that 'stop' button will not show)
    setCancelToken(null)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Sidebar
        style={{ flex: 1 }} // flex:1 makes it fixed
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

        {/* Conversation scroll window */}
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
          <ChatConversation
            chatConvo={chatConvo.length === 0 ? [] : chatConvo}
            setchatConvo={setChatConvo}
          />

          {/* model config buttons, shown only at the start of an empty chat */}
          {chatData?.messages.length === 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '30%',
                justifyContent: 'space-evenly',
                // justifyContent: 'flex-start',
                alignItems: 'center',
                // margin: '5px 0px',
                marginTop: '20px'
              }}
            >
              <ConfigureChatButton
                chatData={chatData}
                setChatData={setChatData}
              />
            </div>
          )}

          {/* chat input text bar and chat configuration buttons*/}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: '10px',
              width: '100%'
            }}
          >
            {cancelToken && (
              <div>
                <CancelAPIButton pending={true} onCancel={onCancelAPI} />
              </div>
            )}

            {/*  chat input text bar  */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                marginBottom: '10px',
                width: '100%'
              }}
            >
              {chatID && <ChatInputBar setInputMessage={setInputMessage} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveChat
