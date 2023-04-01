import React, { useState } from 'react'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { faCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'

const ChatList = ({ chats, setChatList }) => {
  const [hoveredChatIndex, setHoveredChatIndex] = useState(null)
  const [editChatID, setEditChatID] = useState(null)
  const [editChatIndex, setEditChatIndex] = useState(null)
  const [editChatTitle, setEditChatTitle] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  // icon and delete icon. shown when hovered
  const editChatStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    color: '#fff',
    marginRight: '10px'
  }

  function fetchAndSetChatList() {
    // fetch all chats from local storage
    let tempChatList = []
    console.log('🚀 fetching chats from storage')
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      // only extract chat-related data from local storage
      if (key.includes('MA_chat')) {
        const chatDataTemp = JSON.parse(localStorage.getItem(key))
        const chatTitleObj = {
          id: chatDataTemp.id,
          title: chatDataTemp.title,
          updatedAt: chatDataTemp.updatedAt
        }
        tempChatList.push(chatTitleObj)
      }
    }

    // if there are no chats or no data in local storage
    if (tempChatList.length === 0 || localStorage.length === 0) {
      console.log('🚀 no chat found in local storage')
    }

    // sort tempChatList according to chat's updatedAt timestamp
    tempChatList.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
    setChatList(tempChatList)
  }
  // mouse event
  const handleMouseEnterChat = (index) => {
    setHoveredChatIndex(index)
  }

  const handleMouseLeaveChat = () => {
    setHoveredChatIndex(null)
  }

  const handleMouseClickChat = (chatID) => {
    navigate(`/chat/${chatID}`)
  }

  const handleMouseClickChatEdit = (chatID, index) => {
    console.log(`🚀 edit chatID: ${chatID}`)
    setEditChatID(chatID)
    setEditChatIndex(index)
  }
  const handleMouseClickChatDelete = (chatID) => {
    console.log(`🚀 delete chatID: ${chatID}`)
    localStorage.removeItem(`MA_chat_${chatID}`)
    // setChatList(chats.filter((item) => item.id !== chatID)) // remove from chatlist, applicable when path is already at '/', as re-rendering wont happen
    // navgiate to root
    navigate(`/`)
  }

  const handleKeyDownEditChatTitle = (event) => {
    if (event.key === 'Enter') {
      // get latest data
      const chatData = JSON.parse(localStorage.getItem(`MA_chat_${editChatID}`))

      // overwrite title
      if (editChatTitle) {
        chatData.title = editChatTitle.trim()

        if (chatData.title !== '') {
          // save
          localStorage.setItem(
            `MA_chat_${editChatID}`,
            JSON.stringify(chatData)
          )

          // render chat list
          setChatList((prevItems) => {
            return prevItems.map((chat) =>
              chat.id === editChatID ? { ...chat, title: editChatTitle } : chat
            )
          })

          setEditChatID(null)
          setEditChatIndex(null)
          setEditChatTitle(null)
        }
      }
    }
  }

  return (
    <div>
      {chats.map((chat, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor:
              chat.id === id // black if active
                ? 'black'
                : hoveredChatIndex === index // light grey when hovered
                ? '#82868c'
                : '#202123',
            borderRadius: '5px',
            marginBottom: '5px'
          }}
          onMouseEnter={() => handleMouseEnterChat(index)}
          onMouseLeave={() => handleMouseLeaveChat()}
          key={chat.id}
        >
          <li
            style={{
              padding: '5px',
              color: '#fff',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginRight: '5px',
              maxWidth: '100%'
            }}
            onClick={() => handleMouseClickChat(chat.id)}
          >
            <HiOutlineChatBubbleLeft
              icon={faCircle}
              style={{
                fontSize: '20px',
                margin: '5px 8px'
              }}
            />
            {chat.id === editChatID ? (
              <input
                type='text'
                placeholder={chat.title}
                value={editChatTitle}
                onKeyDown={handleKeyDownEditChatTitle}
                onChange={(e) => setEditChatTitle(e.target.value)} // update title on change event
                autoFocus // set focus on the input field when editing chat title
                style={{
                  flex: 1, // expand input to fill available space
                  border: '1px solid #ccc', // grey border
                  borderRadius: '3px', // rounded radius
                  padding: '8px', // add some padding
                  marginRight: '8px', // add some margin to make space for the send button
                  overflowWrap: 'break-word', // break long words onto a new line
                  height: 'auto', // allow input to expand/contract based on amount of text
                  fontSize: '16px'
                }}
              />
            ) : (
              <p
                style={{
                  fontSize: '16px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  // width: '100%',
                  maxWidth: '150px',
                  margin: '5px 0px',
                  marginRight: '5px'
                }}
              >
                {chat.title}
              </p>
            )}
          </li>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              color: '#fff',
              marginRight: '15px',
              opacity: index === hoveredChatIndex ? 1 : 0
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: '8px' }}
              onClick={() => handleMouseClickChatEdit(chat.id, index)}
            />

            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleMouseClickChatDelete(chat.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
