import React, { useEffect, useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false) // state to determine if chat is being hovered over
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // TODO: filter chats based on search input
    console.log(searchTerm)
  }, [searchTerm])

  // function to manage state of sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  const sideBarStyle = {
    backgroundColor: '#202123',
    height: '100vh',
    width: isOpen ? '250px' : '50px',
    // commented out as this caused chatConversation flex-grow to not work
    // position: 'fixed',
    top: '0',
    left: '0',
    overflowX: 'hidden',
    padding: '0 10px',
    transition: 'all 0.2s ease-in-out'
  }

  const newChatStyle = {
    fontFamily: 'Arial', // add font-family property
    backgroundColor: 'transparent', // original: #008CBA
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
    fontFamily: 'Arial', // add font-family property
    backgroundColor: '#ececf1',
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    boxSizing: 'border-box',
    border: '0.5px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
  }

  const listItemStyle = {
    fontFamily: 'Arial',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    display: 'inline-block',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '240px',
    cursor: 'pointer'

    // position: 'relative'
  }

  // icon and delete icon. shown when hovered
  const editChatStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    position: 'relative',
    right: '-200px',
    transform: 'translateY(-100%)',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out'
  }

  // mouse event
  const handleMouseEnterChat = () => {
    setIsHovered(true)
  }

  const handleMouseLeaveChat = () => {
    setIsHovered(false)
  }

  const handleMouseEnterSideBar = () => {
    setIsOpen(true)
  }

  const handleMouseLeaveSideBar = () => {
    setIsOpen(false)
  }

  const onClickNewChat = () => {
    console.log('new chat initiated!')
    navigate('/new_chat')
    // navigate('/new_chat') // navigate to new chat page
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div
      style={sideBarStyle}
      onMouseEnter={handleMouseEnterSideBar}
      onMouseLeave={handleMouseLeaveSideBar}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '5px 5px'
        }}
      >
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
            color: '#fff'
          }}
          //   temp commented out as toggling is based on hovering over sidebar
          //   onClick={toggleSidebar} // Add onClick event handler to toggle sidebar
        >
          {isOpen ? <>&#9776;</> : <>&#9776;</>}
          {/* commented out temporarily as 'Chats' title feels redundant */}
          {/* {isOpen && <span style={{ paddingLeft: '60px' }}>Chats </span>} */}

          {/* Render hamburger icon based on isOpen state */}
        </button>
        <div></div>
      </div>
      {isOpen && (
        <div>
          <input
            type='text'
            placeholder='Search Chat...'
            style={searchBarStyle}
            onChange={handleInputChange}
          />
          <button onClick={onClickNewChat} style={newChatStyle}>
            <FontAwesomeIcon icon={faComment} style={{ marginRight: '8px' }} />
            <span>New chat</span>
          </button>

          <ul
            style={{
              listStyleType: 'none',
              padding: '0px',
              margin: '15px 0'
            }}
          >
            <li
              style={listItemStyle}
              onMouseEnter={handleMouseEnterChat}
              onMouseLeave={handleMouseLeaveChat}
            >
              <HiOutlineChatBubbleLeft
                icon={faCircle}
                style={{ marginRight: '8px' }}
              />
              Write me a react component that render 3 icons relavant to help
              desk
              {/* temp commented out 
                TODO: implement edit chat title */}
              {/* <div style={editChatStyle}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '8px' }} />
                <FontAwesomeIcon icon={faTrash} />
              </div> */}
            </li>
            <li style={listItemStyle}>
              <HiOutlineChatBubbleLeft
                icon={faCircle}
                style={{ marginRight: '8px' }}
              />
              Write a golang map struct interface that create a document into
              mongo
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
