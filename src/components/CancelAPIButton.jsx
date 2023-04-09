import React, { useState } from 'react'

function CancelAPIButton({ pending, onCancel }) {
  const [isPulsing, setIsPulsing] = useState(false)

  // Toggle the pulsing animation on/off every second
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPulsing((prevValue) => !prevValue)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <button
      style={{
        display: pending ? 'block' : 'none', // Hide button when not pending
        width: '80px',
        height: '40px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'red',
        border: 'none',
        borderRadius: '30px',
        marginBottom: '10px',
        cursor: 'pointer',
        outline: 'none'
      }}
      onClick={onCancel}
    >
      <span
        style={{
          marginRight: '10px',
          display: 'block',
          width: '12px',
          height: '12px',
          borderRadius: '20%',
          backgroundColor: 'white',
          animation: `${isPulsing ? 'pulsing' : ''} 0.5s ease-in-out infinite`
        }}
      />
      Stop
    </button>
  )
}

export default CancelAPIButton
