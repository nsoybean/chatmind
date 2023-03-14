import './App.css'
// import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import NewChatButton from './components/NewChat'
import SearchBar from './components/SearchBar'
import ChatIconText from './components/ChatIconText'
import Sidebar from './components/SideBar'

function App() {
  function newChat() {
    console.log('new chat')
  }

  const mockChats = [
    { title: 'Chat 1', id: '123123' },
    {
      title:
        'This is a very long chat name to see how the UI will render accordingly',
      id: '123199'
    }
  ]
  function processChatTitle(string) {
    return 'hi'
  }
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8f7fe'
      }}
    >
      <Sidebar />
    </div>
  )
}

export default App
