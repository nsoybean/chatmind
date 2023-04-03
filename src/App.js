import './App.css'
import ActiveChat from './pages/ActiveChat'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect, createContext } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from './context/token'

function App() {
  const [openAiToken, setOpenAiToken] = useState('')
  const [showConfetti, setShowConfetti] = useState(null)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('MA_openai_token'))
    // if token already exist
    if (token) {
      setOpenAiToken(token)
    }
  }, [])

  return (
    <Context.Provider
      value={{ openAiToken, setOpenAiToken, showConfetti, setShowConfetti }}
    >
      <div>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Routes>
          <Route path='/chat/:id' element={<ActiveChat />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
