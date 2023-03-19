import './App.css'
import Sidebar from './components/SideBar'
// import Layout from './components/Layout'
import NewChat from './pages/NewChat'
import HomePage from './pages/HomePage'
import ActiveChat from './pages/ActiveChat'
import Info from './pages/Info'
import { Routes, Route } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh'
        // backgroundColor: '#f8f7fe'
      }}
    >
      <Sidebar />
      {children}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
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
      />
      <Route
        path='/active_chat'
        element={
          <Layout>
            <ActiveChat />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
