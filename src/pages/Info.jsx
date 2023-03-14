import React from 'react'

function NewChat() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f7fe'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        Want to find out more?
      </h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '50%', textAlign: 'center' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus
        lacus vitae ex pulvinar, sit amet euismod lorem congue. Sed euismod
        sapien velit, eu rhoncus mauris dapibus ac. Suspendisse potenti. Sed sed
        arcu quis nulla sodales rutrum. Nam lacinia, quam at commodo imperdiet,
        ex dolor tempor nulla, eu lacinia ipsum sapien vitae magna. Aenean
        gravida tempor magna, nec sollicitudin nulla ullamcorper id.{' '}
      </p>
      <button
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.2rem',
          marginTop: '2rem',
          cursor: 'pointer'
        }}
      >
        Learn More!
      </button>
    </div>
  )
}

export default NewChat
