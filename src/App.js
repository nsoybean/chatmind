import './App.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import NewChatButton from './components/NewChat'
import SearchBar from './components/SearchBar'
import { RiChat3Line } from 'react-icons/ri'

function App() {
  function newChat() {
    console.log('new chat')
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
          <MenuItem> Chat 1 </MenuItem>
          <MenuItem> Chat 2 </MenuItem>
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
