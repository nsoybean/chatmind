import React, { useState, useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import chatmindLogo from '../assets/chatmind.png'
import MindAiTitle from '../components/MindAiTitle'
import FeatureList from '../components/FeatureList'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from '../styles/markdown/markdown.css'
// import '../styles/awesomeButton/styles.css'

// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark'
// test table markdown
const markdownTable = `
**Reponse**

| Caso                  | Status | Respuesta                                          |
| --------------------- | ------ | -------------------------------------------------- |
| Success               | 200    | {payload}                                          |
| Bad Request           | 400    | { "status": 400, "message": "Bad Request" }        |
| Invalid Credentials   | 401    | { "status": 401,"message": "Invalid redentials"}   |
| Not Found Exception   | 404    | { "status": 404,"message": "Resource not Found"}   |
| Method Not Allowed    | 405    | { "status": 405, "message": "Method Not Allowed" } |
| Conflict Exception    | 409    | { "status": 409, "message": Conflict Exception" }  |
| Internar Server Error | 500    | { "status": 500,"message": Internar Server Error"} |
  `

// const markdownTable = `
// | S/N | Pet | Image |
// |--|--|--|
// | 1 | Cat |![A cat looking at you](https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=68615bab04be2077a471009ffc236509) |
// | 2 | Dog |![A dog looking at you](https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg)|
// `

const markdownTaskList = `
  - [ ] Task list 1
  - [ ] Pending task list 2
  - [x] Completed task list 3
  - [x] Completed task list 4 
`

const cssMarkdownCodeblock = `CSS code example:
 
~~~css
.container{
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}
 
.child-1{
  background-color: red;
}
 
.child-2{
  background-color: blue;
}
 
~~~
`

const javaScriptMarkdownCodeblock = `JavaScript code example:
 
~~~javascript
// function that adds "2 numbers" together
const sumTwoNumbers = (num1, num2) => num1 + num2;
 
// call the function
console.log(sumTwoNumbers(1, 2)); // 3
 
// array of users
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 28 },
  { name: "Bob", age: 25 },
];
 
// print out the users age 
console.log(users.map(user => user.age)); // [30, 28, 25]
~~~
`

const ChatConversation = ({ chatConvo, setChatConvo }) => {
  // console.log('🚀 ChatConversation ~ chatConvo:', chatConvo)
  const [hoveredChat, setHoveredChat] = useState(null)
  // const [chatMessages, setChatMessages] = useState(messages)
  const [markdownCheatSheets, setMarkdownCheatSheets] = useState(null)

  // useEffect(() => {
  //   fetch('https://www.markdownguide.org/api/v1/cheat-sheet.json')
  //     .then((res) => res.json())
  //     .then(({ cheat_sheet }) => {
  //       setMarkdownCheatSheets([
  //         ...cheat_sheet[0]?.basic_syntax,
  //         ...cheat_sheet[1]?.extended_syntax
  //       ])
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

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

  return (
    <>
      {/* <ReactMarkdown
        className={styles.markdown}
        children={markdownTable}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown> */}
      {/* <ReactMarkdown
        className='markdown'
        children={markdownTable}
        remarkPlugins={[remarkGfm]}
      /> */}
      {/* <ReactMarkdown
        children={markdownTable}
        remarkPlugins={[remarkGfm]}
        escapeHtml={true}
      /> */}
      {/* <ReactMarkdown
        children={cssMarkdownCodeblock}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      /> */}
      {/* <ReactMarkdown
        children={javaScriptMarkdownCodeblock}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={dark} // theme
                language={match[1]}
                PreTag='section' // parent tag
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse', // this scrolls chat to the bottom by default
          width: '60%',
          overflow: 'auto',
          maxHeight: '80vh' // set a height to make sure the div doesn't expand infinitely
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
              {chat.role === 'assistant' && (
                <img
                  src={chatmindLogo}
                  alt='chatGPT'
                  style={{ margin: '8px 8px', width: '36px', height: '36px' }}
                />
              )}

              {/* {chat.content} */}
              {chat.role === 'assistant' ? (
                <div
                  style={{
                    backgroundColor: chat.role === 'user' ? '#3b82f6' : 'white',
                    color: chat.role === 'user' ? 'white' : 'black',
                    padding: '15px',
                    borderRadius: '15px',
                    maxWidth: '600px', // chat bubble not taking up full width
                    margin: '8px 0px',
                    overflowWrap: 'break-word'
                    // overflow: 'scroll',
                  }}
                >
                  {/* version 1 */}
                  {/* <ReactMarkdown
                    children={chat.content}
                    remarkPlugins={[remarkGfm]}
                  /> */}
                  {/* version 2 */}
                  {/* <ReactMarkdown
                  children={chat.content}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={dark}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                /> */}
                  {/* version 3 (dynamic) */}
                  {/* {markdownCheatSheets && (
                    <div>
                      {markdownCheatSheets?.map(({ element, syntax }) => {
                        return (
                          <div key={element}>
                            <h1>{element}</h1>
                            <p>{syntax}</p>
                            <div>
                              <h3>Examples</h3>
                              <ReactMarkdown
                                children={syntax}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  code({ children, ...props }) {
                                    return (
                                      <SyntaxHighlighter
                                        children={String(children).replace(
                                          /\n$/,
                                          ''
                                        )}
                                        style={dark}
                                        PreTag='section'
                                        {...props}
                                      />
                                    )
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )} */}
                  <ReactMarkdown
                    children={chat.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={a11yDark} // theme
                            language={match[1]}
                            PreTag='section' // parent tag
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  />
                </div>
              ) : (
                <span
                  style={{
                    backgroundColor: chat.role === 'user' ? '#3b82f6' : 'white',
                    color: chat.role === 'user' ? 'white' : 'black',
                    padding: '10px',
                    borderRadius: '15px',
                    // width: 'fit-content',
                    maxWidth: '600px', // chat bubble not taking up full width
                    margin: '8px 0px',
                    overflow: 'scroll',
                    overflowWrap: 'break-word'
                  }}
                >
                  {chat.content}
                </span>
              )}
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

        {/* feature list */}
        <FeatureList />

        {/* brand */}
        <MindAiTitle />
      </div>
    </>
  )
}

export default ChatConversation
