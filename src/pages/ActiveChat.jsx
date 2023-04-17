import React, { useState, useEffect, useContext, useRef } from 'react'
import ChatConversation from '../components/ChatConversation'
import ChatInputBar from '../components/ChatInputBar'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Sidebar from '../components/SideBar'
import { OpenAiAPI } from '../api/openAiAPI'
import general from '../helper/general'
import { toast } from 'react-toastify'
import ConfigureChatButton from '../components/ConfigureChatButton'
import CharacterPromptLibButton from '../components/CharacterPromptLibButton'
import PromptLibButton from '../components/PromptLibButton'
import CancelAPIButton from '../components/CancelAPIButton'
import axios from 'axios'
import { Context } from '../context/token'
import { SSE } from 'sse.js'
import LoginModal from '../components/LoginModal'
import { FaUser } from 'react-icons/fa'

// global variable to store chatGPT's response
let eventStream

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
  const [result, setResult] = useState('')
  const [profileIconHovered, setProfileIconHovered] = useState(null)
  const [profileModal, setProfileModal] = useState(false)

  const resultRef = useRef()
  useEffect(() => {
    resultRef.current = result
  }, [result])

  const { id } = useParams()
  const navigate = useNavigate()

  // global use context
  const { chatInput, session } = useContext(Context)

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

          let url = 'https://api.openai.com/v1/chat/completions'
          let data = {
            model: tempChatData.model,
            messages: tempChatData.messages,
            temperature: tempChatData.temperature,
            stream: true
            // max_tokens: chatData.maxToken //empty
          }

          const API_KEY = JSON.parse(localStorage.getItem('MA_openai_token'))

          if (!API_KEY) {
            toast.error('Missing OpenAI Key!', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark'
            })
            return
          }

          // cancel API state
          let tempCancelToken = axios.CancelToken.source()
          setCancelToken(tempCancelToken)

          eventStream = new SSE(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY}`
            },
            method: 'POST',
            payload: JSON.stringify(data)
          })

          // stream response
          let assistantResponse = { role: 'assistant', content: '' }
          let isAssistantChatInitiated = false

          eventStream.addEventListener('message', (e) => {
            if (e.data != '[DONE]') {
              let payload = JSON.parse(e.data)
              //  ensure respones has 'content' data
              if (payload.choices[0].delta.content) {
                // on first response, init assistant response into conversation
                if (!isAssistantChatInitiated) {
                  isAssistantChatInitiated = true
                  // update assistant content to render streamed response
                  setChatData((prevState) => {
                    let messages = [...prevState.messages] // copy previous state
                    // messages[messages.length - 1].content = resultRef.current
                    messages.push(assistantResponse) // init assistant chat content
                    return {
                      ...prevState,
                      messages: messages, // replace new messages
                      updatedAt: new Date().toISOString()
                    }
                  })
                }

                let text = payload.choices[0].delta.content
                // if (text !== '\n') {
                // console.log('Text: ' + text)
                resultRef.current = resultRef.current + text
                // console.log('ResultRef.current: ' + resultRef.current)
                setResult(resultRef.current)

                // append streamed response (text) to assistant's chat to re-render streamed response
                setChatData((prevState) => {
                  let messages = [...prevState.messages] // copy previous state
                  messages[messages.length - 1].content = resultRef.current // replace assistant's chat content
                  // messages.push(inputMessage)
                  return {
                    ...prevState,
                    messages: messages, // replace new messages
                    updatedAt: new Date().toISOString()
                  }
                })
                // }
              }
            } else {
              // console.log('stream ended! [DONE]!')
              // reset states
              setResult('')
              // reset (so that 'stop' button will not show)
              setCancelToken(null)
              eventStream.close()
            }
          })

          eventStream.stream()
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
      // cancelToken.cancel('Cancelled AfPI Request') // err msg in promise's error.message
      eventStream.close()
      setResult('')
    }
    // reset (so that 'stop' button will not show)
    setCancelToken(null)
  }

  function toggleProfileModal() {
    setProfileModal(!profileModal)
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
      {/* SIDEBAR PANEL */}
      <Sidebar
        style={{ flex: 1 }} // flex:1 makes it fixed
        chatList={chatList}
        setChatList={setChatList}
      />

      {/* MAIN PAGE PANEL */}
      <div
        style={{
          display: 'flex',
          flexGrow: 1, // ensure main page takes up remaining space horizontally
          flexDirection: 'column',
          justifyContent: 'flex-start', // main axis (vertically)
          alignItems: 'center', // cross axis (horizontally)
          height: '100%',
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
              height: profileIconHovered ? '42px' : '40px',
              width: profileIconHovered ? '42px' : '40px',
              borderRadius: '100%',
              // backgroundColor: profileIconHovered ? '#3b71ca' : '#fff', // white default, hovered blue
              backgroundColor: profileIconHovered ? '#2c5aa4' : '#3b71ca', // dark-grey default, hovered black
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
            <FaUser size={20} style={{ color: 'white' }} />
          </div>
          {profileModal && (
            <LoginModal
              showModel={profileModal}
              setShowModal={setProfileModal}
              session={session}
            />
          )}
        </div>

        {/* CONVERSATION SECTION */}
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start', // main axis (vertically)
            alignItems: 'center', // cross axis (horizontally)
            width: '100%',
            height: '80vh' // set a height to make sure the div doesn't expand infinitely
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
                alignItems: 'center',
                marginTop: '20px'
              }}
            >
              <ConfigureChatButton
                chatData={chatData}
                setChatData={setChatData}
              />
            </div>
          )}

          {/* CHAT SECTION */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
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

            {/*  prompt library, shown only when user chat input is empty */}
            {!chatInput && !cancelToken && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ padding: '5px 0px', margin: '0px 3px' }}>
                  <CharacterPromptLibButton />
                </div>
                <div style={{ padding: '5px 0px', margin: '0px 3px' }}>
                  <PromptLibButton />
                </div>
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
                width: '100%',
                padding: '5px 0px'
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
