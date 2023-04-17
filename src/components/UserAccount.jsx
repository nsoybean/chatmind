import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { BsChevronExpand } from 'react-icons/bs'
import { MDBBtn } from 'mdb-react-ui-kit'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const UserAccount = ({ email, avatarUrl }) => {
  const [hovered, setHovered] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function login() {
    console.log('log in...')
  }

  function toggleShow() {
    setShowModal(!showModal)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '10px 1px',
          cursor: 'pointer',
          width: '100%',
          backgroundColor: hovered ? '#82868c' : '#202123',
          margin: '5px 0px',
          borderRadius: '5px'
        }}
        onClick={toggleShow}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            height: '30px',
            width: '30px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={avatarUrl}
              style={{ height: '100%', maxWidth: '100%' }}
            />
          ) : (
            <FaUser size={20} color='#666' />
          )}
        </div>

        <div
          style={{
            marginLeft: '20px',
            color: 'white',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '100px'
          }}
        >
          {email}
        </div>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <BsChevronExpand size={20} color='white' />
        </div>
      </div>

      {showModal && (
        <Box
          sx={{
            display: 'inline-block',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128
            },
            color: 'black',
            position: 'relative',
            left: '300px',
            top: '-200px'
          }}
        >
          <Paper elevation={3} />
        </Box>
      )}
    </>
  )
}

export default UserAccount
