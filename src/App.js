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
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { supabase } from './util/supabaseClient'

import { createClient } from '@supabase/supabase-js'
const supabaseOptions = {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}

// const supabase = createClient(
//   'https://edtsmqfxjwkadjtzwupl.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdHNtcWZ4andrYWRqdHp3dXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NDgxOTksImV4cCI6MTk5NjQyNDE5OX0.jsesB8nxIryrIUSrgUiysgcsavSgbtxcznQriNyl1wc',
//   supabaseOptions
// )

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
          <Route exact path='/' element={<Home />} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
