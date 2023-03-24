import './App.css'
// import Layout from './components/Layout'
import ActiveChat from './pages/ActiveChat'
import { Routes, Route, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<ActiveChat />} />
      <Route exact path='/chat/:id' element={<ActiveChat />} />
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
