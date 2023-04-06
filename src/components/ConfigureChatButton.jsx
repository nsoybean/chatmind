import { useState } from 'react'

const ConfigureChatButton = () => {
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
          // backgroundColor: '#FFFFFF',
          color: '#fff',
          backgroundColor: '#8F43EE',
          border: '1px solid #CCCCCC',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <div className='fas fa-cog' style={{ marginRight: '5px' }}></div>
        <div> Model </div>
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
            justifyContent: 'center',
            zIndex: 9999
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
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Settings</p>
            <p>Some content goes here...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfigureChatButton
