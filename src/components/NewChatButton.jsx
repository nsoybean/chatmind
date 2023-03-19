import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const NewChatButton = ({ onClick }) => {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#007bff',
    color: '#fff', // text color
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
    padding: '1em 75px',
    margin: '5px auto'
  }

  const iconStyle = {
    marginRight: '8px'
  }

  return (
    <button onClick={onClick} style={buttonStyle}>
      <FontAwesomeIcon icon={faComment} style={iconStyle} />
      <span>New Chat</span>
    </button>
  )
}

export default NewChatButton
