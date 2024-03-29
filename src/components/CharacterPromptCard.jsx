import React, { useContext } from 'react'
import { Typography } from '@mui/material'
// import './cardColumn.css'
import { MDBBtn } from 'mdb-react-ui-kit'
import { Context } from '../context/token'
import { Highlight } from 'react-instantsearch-hooks-web'

const CharacterPromptCard = ({ hit }) => {
  // global use context
  const { setChatInput } = useContext(Context)

  function applyPrompt(hit) {
    console.log(`🚀 applying prompt: ${hit.act}`)
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
          {/* act */}
          <Typography className='title' variant='h6'>
            <Highlight attribute='act' hit={hit} />
          </Typography>

          {/* prompt */}
          <div
            className='prompt'
            style={
              {
                // overflow: 'hidden'
                // whiteSpace: 'nowrap'
                // textOverflow: 'ellipsis'
                // maxWidth: '80%'
              }
            }
          >
            <Highlight attribute='prompt' hit={hit} />
          </div>

          {/* source */}
          {hit.source && (
            <div className='source'>
              <span style={{ marginRight: '10px' }}>source:</span>
              {hit.source && (
                <a href={hit.source} target='_blank' rel='noreferrer'>
                  {extractHostname(hit.source)}
                </a>
              )}
            </div>
          )}
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

export default CharacterPromptCard
