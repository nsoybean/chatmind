import React from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'

const ChatIconText = ({ text }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const iconStyle = {
    display: 'inline-block',
    marginRight: '10px',
    fontSize: '20px'
  }

  const textStyle = {
    display: 'inline-block',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '10px',
    width: '30px' // set a fixed width for the element so it doesn't expand
  }

  return (
    <div style={containerStyle}>
      <HiOutlineChatBubbleLeft icon={faCircle} style={iconStyle} />
      <p style={textStyle}>{text}</p>
    </div>
  )
}

export default ChatIconText
