import './App.css'
import ActiveChat from './pages/ActiveChat'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
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
        <Route exact path='/' element={<Home />} />
        <Route exact path='/chat/:id' element={<ActiveChat />} />
      </Routes>
    </div>
  )
}

export default App
