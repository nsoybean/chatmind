import React, { useEffect, useState, useContext } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import ChatList from '../components/ChatList'
import TokenModal from '../components/TokenModal'
import ConfettiExplosion from 'react-confetti-explosion'
import { Context } from '../context/token'
// import Darkmode from 'darkmode-js'

function Sidebar({ chatList, setChatList }) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredChatList, setFilteredChatList] = useState([]) // array of chat list. Only contains chat id and title

  const { showConfetti } = useContext(Context)

  // TODO: filter chats based on search input
  useEffect(() => {
    setFilteredChatList(chatList)
  }, [chatList])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredChatList(chatList)
    } else {
      const filteredArray = chatList.filter((chat) => {
        return chat.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim())
      })
      setFilteredChatList(filteredArray)
    }
  }, [searchTerm])

  // function to manage state of sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sideBarStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#202123',
    height: '100vh',
    top: '0',
    left: '0',
    padding: '0 10px',
    transition: 'all 0.3s ease-in-out'
  }

  const newChatStyle = {
    display: 'flex',
    fontFamily: 'Arial',
    backgroundColor: 'transparent',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    margin: '5px 0',
    fontSize: '16px',
    border: '0.5px solid #ccc',
    cursor: 'pointer'
  }

  const searchBarStyle = {
    display: 'flex',
    backgroundColor: '#ececf1',
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    boxSizing: 'border-box',
    border: '0.5px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
  }

  const handleMouseEnterSideBar = () => {
    setIsOpen(true)
  }

  const handleMouseLeaveSideBar = () => {
    setIsOpen(false)
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      setSearchTerm('')
    }
  }

  const createNewChat = () => {
    const chatID = uuidv4()
    const initChat = {
      id: chatID,
      title: 'MindAI Chat',
      messages: [],
      updatedAt: new Date().toISOString(),
      model: 'gpt-3.5-turbo', // default
      temperature: 0.7, // default
      maxToken: 4096
    }
    localStorage.setItem(`MA_chat_${chatID}`, JSON.stringify(initChat))
    console.log('🚀 New chat initiated:', chatID)

    // reset search (if any)
    setSearchTerm('')
    // navigate
    navigate(`/chat/${chatID}`)
  }

  async function onClickNewChat() {
    // create new chat is there is currently no chats
    if (chatList.length === 0) {
      createNewChat()
    } else {
      // else determine if latest chat is empty
      const latestChatID = chatList[0].id
      const latestChatConvo = JSON.parse(
        localStorage.getItem(`MA_chat_${latestChatID}`)
      ).messages

      // if so, do not create chat
      if (latestChatConvo.length === 0) {
        console.log('🚀 You already have an empty chat!')
      } else {
        // otherwise, create chat
        createNewChat()
      }
    }
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // temp comment out dark-mode
  // const darkLightModeOption = {
  //   bottom: '2%', // default: '32px'
  //   right: '2%', // default: '32px'
  //   left: 'unset', // default: 'unset'
  //   time: '0.5s', // default: '0.3s'
  //   mixColor: '#fff', // default: '#fff'
  //   backgroundColor: '#FF0000', // default: '#fff'
  //   buttonColorDark: '#100f2c', // default: '#100f2c'
  //   buttonColorLight: '#fff', // default: '#fff'
  //   saveInCookies: false, // default: true,
  //   label: '🌓', // default: ''
  //   autoMatchOsTheme: true // default: true
  // }

  // const darkmode = new Darkmode(darkLightModeOption)
  // darkmode.showWidget()

  return (
    <div
      style={sideBarStyle}
      // onMouseEnter={handleMouseEnterSideBar}
      // onMouseLeave={handleMouseLeaveSideBar}
    >
      <div
        style={{
          display: 'flex',
          margin: '5px 0px'
        }}
      >
        <button
          style={{
            display: 'flex',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
            color: '#fff',
            width: '100%',
            margin: '5px 0'
          }}
          onClick={toggleSidebar}
          //   temp commented out as toggling is based on hovering over sidebar
          //   onClick={toggleSidebar} // Add onClick event handler to toggle sidebar
        >
          {isOpen ? <>&#9776;</> : <>&#9776;</>}
          {/* commented out temporarily as 'Chats' title feels redundant */}
          {/* {isOpen && <span style={{ paddingLeft: '60px' }}>Chats </span>} */}

          {/* Render hamburger icon based on isOpen state */}
        </button>
      </div>
      {isOpen && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // main axis (vertically)
            alignItems: 'flex-start' // cross axis (horizontally) }}>
          }}
        >
          <input
            type='text'
            placeholder='Search Chat...'
            style={searchBarStyle}
            value={searchTerm}
            onKeyDown={handleSearchKeyDown}
            onChange={handleInputChange}
          />
          <button onClick={onClickNewChat} style={newChatStyle}>
            <FontAwesomeIcon
              icon={faComment}
              style={{ marginRight: '8px', marginTop: '5px' }}
            />
            <span>New chat</span>
          </button>

          <ul
            style={{
              listStyleType: 'none',
              padding: '0px',
              margin: '10px 0',
              overflow: 'auto',
              maxHeight: '60vh',
              width: '100%'
            }}
          >
            <ChatList
              chats={filteredChatList ? filteredChatList : chatList}
              setChatList={setChatList}
            />
          </ul>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              marginTop: 'auto', // flushed to the bottom
              marginLeft: '5px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#fff',
                margin: '5px 0px',
                fontWeight: 'bold'
              }}
            >
              OpenAI API KEY
            </div>
            {showConfetti && <ConfettiExplosion />}
            <TokenModal stye={{ margin: '5px 0px' }} text='Enter Here' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
