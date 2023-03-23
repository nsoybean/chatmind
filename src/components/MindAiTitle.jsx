import React from 'react'
import mindAiLogo from '../assets/mindAi.png'

const MindAiTitle = () => {
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
          height: 'auto'
        }}
      />

      <h2 style={styles.slogan}>
        Maximize the power of ChatGPT with better UI
      </h2>
    </div>
  )
}

export default MindAiTitle
