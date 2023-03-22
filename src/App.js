import './App.css'
import Sidebar from './components/SideBar'
// import Layout from './components/Layout'
import NewChat from './pages/NewChat'
import ActiveChat from './pages/ActiveChat'
import Info from './pages/Info'
import { Routes, Route } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: '100vh'
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
      {/* <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      /> */}
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
        path='/chat'
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
