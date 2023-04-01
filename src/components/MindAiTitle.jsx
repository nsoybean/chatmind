import React from 'react'
import { useNavigate } from 'react-router-dom'
import mindAiLogo from '../assets/mindAi.png'
import { MDBBtn } from 'mdb-react-ui-kit'

const MindAiTitle = () => {
  const navigate = useNavigate()
  const styles = {
    title: {
      fontSize: '4rem',
      fontWeight: 'bold',
      color: '#1C1C1C',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    slogan: {
      fontSize: '1.5rem',
      fontWeight: 'normal',
      color: '#5B5B5B',
      textAlign: 'center',
      margin: '10px 0px'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center', // main axis
        alignItems: 'center' // cross axis
      }}
    >
      <img
        src={mindAiLogo}
        alt='mindAi Logo'
        style={{
          marginTop: '20px',
          marginBottom: '10px',
          width: '250px',
          height: 'auto',
          cursor: 'pointer'
        }}
        onClick={() => {
          navigate('/')
        }}
      />
      <MDBBtn
        style={{
          background:
            'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))',
          cursor: 'default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30px',
          width: '60px',
          fontSize: '14px',
          // relative position
          top: '-85px',
          right: '-160px',
          relative: '20px'
        }}
      >
        Beta
      </MDBBtn>

      <h2 style={styles.slogan}>
        Maximize the power of ChatGPT with better UI
      </h2>
    </div>
  )
}

export default MindAiTitle
