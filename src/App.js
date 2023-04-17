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
import { supabase } from './util/supabaseClient'
import PromptForm from './components/PromptForm'

function App() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [openAiToken, setOpenAiToken] = useState('')
  const [showConfetti, setShowConfetti] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [accountDetails, setAccountDetails] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // this enables UI to show logged out without refreshing
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('MA_openai_token'))
    // if token already exist
    if (token) {
      setOpenAiToken(token)
    }
  }, [])

  useEffect(() => {
    async function setUserDataFromSession() {
      const { user } = session
      setUser(user)
    }

    if (session) {
      setUserDataFromSession()
    }
  }, [session])

  return (
    <Context.Provider
      value={{
        openAiToken,
        setOpenAiToken,
        showConfetti,
        setShowConfetti,
        chatInput,
        setChatInput,
        session,
        setSession,
        supabase,
        user
      }}
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
        {/* more specific paths to less specific paths, this is so you won't need to specify the exact */}
        <Routes>
          <Route path='/chat/:id' element={<ActiveChat />} />
          <Route
            path='/new-prompt/'
            element={<PromptForm session={session} />}
          />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
