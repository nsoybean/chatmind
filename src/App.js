import './App.css'
import ActiveChat from './pages/ActiveChat'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/chat/:id' element={<ActiveChat />} />
    </Routes>
  )
}

export default App
