import { useState } from 'react'
import Typography from '@mui/material/Typography'

const PromptLibButton = () => {
  const [showModal, setShowModal] = useState(false)

  function handleButtonClick() {
    setShowModal(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          borderRadius: '20px',
          width: '120px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          backgroundColor: '#CD0404',
          border: '1px solid #CCCCCC',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <div className='fas fa-cog' style={{ marginRight: '5px' }}></div>
        <div> Prompt </div>
      </div>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            // zIndex: 1
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography
              variant='h6'
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '5px'
                // fontSize: 'large',
                // fontWeight: 'bold'
              }}
            >
              Prompt Library
            </Typography>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Settings</p>
            <p>Some content goes here...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptLibButton
