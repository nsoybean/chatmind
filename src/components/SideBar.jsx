import React, { useEffect, useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Sidebar() {
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
    height: '100%',
    width: isOpen ? '250px' : '50px',
    position: 'fixed',
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
    margin: '0px 0',
    fontSize: '16px',
    border: '0.5px solid #ccc',
    cursor: 'pointer'
  }

  const searchBarStyle = {
    fontFamily: 'Arial', // add font-family property
    backgroundColor: '#ececf1',
    width: '100%',
    padding: '10px',
    margin: '8px 0',
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
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const onClickNewChat = () => {
    console.log('new chat initiated!')
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div style={sideBarStyle}>
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
          onClick={toggleSidebar} // Add onClick event handler to toggle sidebar
        >
          {isOpen ? <>&times;</> : <>&#9776;</>}{' '}
          {/* Render hamburger icon based on isOpen state */}
        </button>
        <div></div>
      </div>
      {isOpen && (
        <div>
          <button onClick={onClickNewChat} style={newChatStyle}>
            <FontAwesomeIcon icon={faComment} style={{ marginRight: '8px' }} />
            <span>New chat</span>
          </button>
          <input
            type='text'
            placeholder='Search Chat...'
            style={searchBarStyle}
            onChange={handleInputChange}
          />
          <ul
            style={{
              listStyleType: 'none',
              padding: '0px',
              margin: '0'
            }}
          >
            <li
              style={listItemStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HiOutlineChatBubbleLeft
                icon={faCircle}
                style={{ marginRight: '8px' }}
              />
              This is a very long menu that cannot be seen in its entirety
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
              Menu Item 2
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
