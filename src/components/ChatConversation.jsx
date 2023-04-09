import React, { useState, useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import chatmindLogo from '../assets/chatmind.png'
import MindAiTitle from '../components/MindAiTitle'
import FeatureList from '../components/FeatureList'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from '../styles/markdown/markdown.css'
import CodeCopyBtn from './CodeCopyBtn'
import Darkmode from 'darkmode-js'

const ChatConversation = ({ chatConvo, setChatConvo }) => {
  // console.log('🚀 ChatConversation ~ chatConvo:', chatConvo)
  const [hoveredChat, setHoveredChat] = useState(null)
  // const [chatMessages, setChatMessages] = useState(messages)
  const [markdownCheatSheets, setMarkdownCheatSheets] = useState(null)

  // const darkmode = new Darkmode()
  // darkmode.toggle()
  // console.log(darkmode.isActivated())
  // console.log(
  //   '🚀 ~ file: ChatConversation.jsx:26 ~ ChatConversation ~ darkmode.isActivated():',
  //   darkmode.isActivated()
  // )

  const handleMouseEnter = (index) => {
    setHoveredChat(index)
  }

  const handleMouseLeave = () => {
    setHoveredChat(null)
  }

  const handleEdit = (index, editedMessage) => {
    const newMessages = [...chatConvo]
    newMessages[index] = editedMessage
    setChatConvo(newMessages)
  }

  const handleDelete = (index) => {
    const newMessages = chatConvo.filter((message, i) => i !== index)
    setChatConvo(newMessages)
  }

  // Add the CodeCopyBtn component to our PRE element
  const Pre = ({ children }) => (
    <pre className='code-pre'>
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse', // this scrolls chat to the bottom by default
          width: '70%',
          overflow: 'auto',
          maxHeight: '100%'
        }}
      >
        {/* !!! components are layed out in reverse as flex-direction is column-reverse */}
        {/* rendering of conversation in text bubbles */}
        {/* reverse chat as chat convo is col-reverse */}
        {chatConvo
          .slice()
          .reverse()
          .map((chat, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                // USER AND CHATGPT CHAT RENDERED ON RIGHT AND LEFT RESPECTIVELY
                justifyContent:
                  chat.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'start' // vertically align logo and text
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {/* assistant icon */}
              {chat.role === 'assistant' && (
                <img
                  src={chatmindLogo}
                  alt='chatGPT'
                  style={{ margin: '8px 8px', width: '36px', height: '36px' }}
                />
              )}

              {/* {assistant's content} */}
              {chat.role === 'assistant' ? (
                <div
                  className='assistant-content darkmode-ignore'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: chat.role === 'user' ? '#3b82f6' : 'white',
                    color: chat.role === 'user' ? 'white' : 'black',
                    padding: '20px',
                    borderRadius: '15px',
                    maxWidth: '90%', // chat bubble not taking up full width
                    // width: '580px', // chat bubble not taking up full width
                    margin: '8px 0px',
                    overflowWrap: 'break-word',
                    overflow: 'auto'
                  }}
                >
                  <ReactMarkdown
                    className='post-markdown'
                    linkTarget='_blank'
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      pre: Pre,
                      code({
                        node,
                        inline,
                        className = 'blog-code',
                        children,
                        ...props
                      }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={a11yDark}
                            language={match[1]}
                            PreTag='div'
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {chat.content}
                  </ReactMarkdown>
                </div>
              ) : (
                // user's content
                <div
                  className='user-content darkmode-ignore'
                  style={{
                    backgroundColor: chat.role === 'user' ? '#3b82f6' : 'white',
                    color: chat.role === 'user' ? 'white' : 'black',
                    padding: '10px',
                    borderRadius: '15px',
                    // width: 'fit-content',
                    maxWidth: '90%',
                    // maxWidth: '600px', // chat bubble not taking up full width
                    margin: '8px 0px',
                    overflowWrap: 'break-word'
                  }}
                >
                  {chat.content}
                </div>
              )}
              {/* user icon */}
              {chat.role === 'user' && (
                <div
                  style={{
                    backgroundColor: '#e5e7eb',
                    borderRadius: '20%',
                    margin: '8px 8px',
                    padding: '8px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <FaUserAlt size={16} color='#808080' />
                </div>
              )}
              {/* temp comment out edit and delete button */}
              {/* {hoveredChat === index && (
            <div>
              <button onClick={() => handleEdit(index, 'edited message')}>
                Edit
              </button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )} */}
            </div>
          ))}

        {/* chat config */}
        {/* <ConfigureChatButton chatData={chatData} setChatData={setChatData} /> */}

        {/* feature list */}
        <FeatureList />

        {/* brand */}
        <MindAiTitle />
      </div>
    </>
  )
}

export default ChatConversation
