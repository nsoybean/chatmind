import './App.css'
import ActiveChat from './pages/ActiveChat'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<ActiveChat />} />
      <Route exact path='/chat/:id' element={<ActiveChat />} />
    </Routes>
  )
}

export default App
