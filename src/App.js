import './App.css'
import Sidebar from './components/SideBar'
// import Layout from './components/Layout'
import HomePage from './pages/NewChat'

function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: '',
        height: '100vh',
        backgroundColor: '#f8f7fe'
      }}
    >
      <Sidebar />
      {children}
    </div>
  )
}

function App() {
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     height: '100vh',
    //     backgroundColor: '#f8f7fe'
    //   }}
    // >
    //   <Sidebar />
    // </div>
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default App
