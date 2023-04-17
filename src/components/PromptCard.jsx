import React, { useContext } from 'react'
import { Typography } from '@mui/material'
// import './cardColumn.css'
import { MDBBtn } from 'mdb-react-ui-kit'
import { Context } from '../context/token'
import { Highlight } from 'react-instantsearch-hooks-web'

const PromptCards = ({ hit }) => {
  // global use context
  const { setChatInput } = useContext(Context)

  function applyPrompt(hit) {
    // uncomment to see all data on prompt
    // console.log('🚀hit:', hit)
    console.log(`🚀 applying prompt: ${hit.title}`)
    setChatInput(hit.prompt)
  }

  return (
    <div
      className='card-container'
      style={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}
    >
      <div
        key={hit.id}
        className='card'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0px 0px',
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
          <div
            style={{ marginBottom: '10px' }}
            className={`field ${hit.field.toLowerCase()}`}
          >
            <span
              style={{
                borderRadius: '40px',
                padding: '5px 10px',
                backgroundColor: `#${hit.title_bg_colour}` ?? '#82C3EC' // colour configured in BD, else default to blue
              }}
            >
              <Highlight attribute='field' hit={hit} />
            </span>
          </div>

          {/* title */}
          <Typography
            style={{ marginBottom: '5px' }}
            className='title'
            variant='h6'
          >
            <Highlight attribute='title' hit={hit} />
          </Typography>
          {/* prompt */}
          {/* <div className='prompt'>{truncateText(card.prompt)}</div> */}
          <div
            className='prompt'
            style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3
            }}
          >
            <Highlight attribute='prompt' hit={hit} />
          </div>

          {/* prompts metadata */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px'
            }}
          >
            {/* user */}
            {hit?.user_name && (
              <span style={{ marginRight: '10px' }}>user: {hit.user_name}</span>
            )}

            {/* source */}
            {hit.source && (
              <>
                <span style={{ marginRight: '10px' }}>
                  source:
                  <a
                    href={hit.source}
                    target='_blank'
                    rel='noreferrer'
                    style={{ marginLeft: '5px' }}
                  >
                    {extractHostname(hit.source)}
                  </a>
                </span>
              </>
            )}
          </div>
        </div>

        {/* apply prompt button */}
        <div>
          <MDBBtn
            style={{
              marginRight: '5px'
            }}
            onClick={() => applyPrompt(hit)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Apply</span>
              <span style={{ fontSize: '20px', marginLeft: '5px' }}>👉</span>
            </div>
          </MDBBtn>
        </div>
      </div>
    </div>
  )
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

export default PromptCards
