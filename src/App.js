import './App.css'
import Sidebar from './components/SideBar'
// import Layout from './components/Layout'
import NewChat from './pages/NewChat'
import ActiveChat from './pages/ActiveChat'
import Info from './pages/Info'
import { Routes, Route, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Layout({ children }) {
  const navigate = useNavigate()
  const [chatList, setChatList] = useState(null)

  // first render useEffect
  useEffect(() => {
    // fetch all chats from local storage
    let tempChatList = []
    console.log('🚀 looking through local storage')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      // only extract chat-related data from local storage
      if (key.includes('mindAI_chat')) {
        const chatData = JSON.parse(localStorage.getItem(key))
        const chatTitleObj = { id: chatData.id, title: chatData.title }
        tempChatList.push(chatTitleObj)
      }
    }

    // if there are no chats or no data in local storage
    if (tempChatList.length === 0 || localStorage.length === 0) {
      console.log('🚀 no chat found in local storage')
      // const chatID = uuidv4()
      // const initChat = { id: chatID, title: 'New Chat', messages: [] }
      // push to local storage
      // localStorage.setItem(`mindAI_chat_${chatID}`, JSON.stringify(initChat))

      // push to tempChatList for render
      // tempChatList.push(initChat)
    }

    // navigate(`/chat?id=${tempChatList[0].id}`)
    setChatList(tempChatList)
  }, [])

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
      {children}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <Layout>
            <ActiveChat />
          </Layout>
        }
      />
      <Route
        exact
        path='/chat'
        element={
          <Layout>
            <ActiveChat />
          </Layout>
        }
      />
      {/* <Route
        path='/new_chat'
        element={
          <Layout>
            <NewChat />
          </Layout>
        }
      />
      <Route
        path='/info'
        element={
          <Layout>
            <Info />
          </Layout>
        }
      /> */}
    </Routes>
  )
}

export default App
