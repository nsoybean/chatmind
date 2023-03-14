import './App.css'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import NewChatButton from './components/NewChat'
import SearchBar from './components/SearchBar'
import ChatIconText from './components/ChatIconText'

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
        height: '100vh'
      }}
    >
      <Sidebar>
        <Menu
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <NewChatButton onClick={newChat} />
          <SearchBar />

          {mockChats.map((chat) => (
            <MenuItem key={chat.id} style={{ margin: '1px', padding: '20px' }}>
              <ChatIconText text={chat.title} />
            </MenuItem>
          ))}

          {/* commenting out submenu for now */}
          {/* <SubMenu label='Charts'>
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
        </Menu>
      </Sidebar>
    </div>
  )
}

export default App
