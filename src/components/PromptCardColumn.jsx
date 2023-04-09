import { Typography } from '@mui/material'
import React from 'react'
// import './cardColumn.css'
import { MDBBtn } from 'mdb-react-ui-kit'

const PromptCardColumn = ({ cards }) => {
  function applyPrompt(id) {
    console.log(`applying prompt id: ${id}`)
  }

  return (
    <div
      className='card-container'
      style={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}
    >
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            className='card'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 0px',
              padding: '15px',
              border: '1px solid #D8D8D8'
            }}
          >
            <div
              style={{
                maxWidth: '80%'
              }}
            >
              {/* field */}
              <div className={`field ${card.field.toLowerCase()}`}>
                <span style={{ backgroundColor: '#a7ffa7' }}>{card.field}</span>
              </div>

              {/* field */}
              <Typography className='title' variant='h6'>
                {card.title}
              </Typography>

              {/* prompt */}
              {/* <div className='prompt'>{truncateText(card.prompt)}</div> */}
              <div
                className='prompt'
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                  // maxWidth: '80%'
                }}
              >
                {card.prompt}
              </div>

              {/* source */}
              <div className='source'>
                <span style={{ marginRight: '10px' }}>source:</span>
                {card.source && (
                  <a href={card.source} target='_blank' rel='noreferrer'>
                    {extractHostname(card.source)}
                  </a>
                )}
              </div>
            </div>

            {/* apply prompt button */}
            <div>
              <MDBBtn
                style={{
                  marginRight: '5px'
                }}
                onClick={() => applyPrompt(card.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Apply</span>
                  <span style={{ fontSize: '20px', marginLeft: '5px' }}>
                    {' '}
                    👉{' '}
                  </span>
                </div>
              </MDBBtn>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Helper function to truncate text longer than 100 characters
const truncateText = (text) => {
  if (text.length > 100) {
    return text.substring(0, 80) + '...'
  } else {
    return text
  }
}

// Helper function to extract hostname from URL
const extractHostname = (url) => {
  let hostname
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }
  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  return hostname
}

export default PromptCardColumn
