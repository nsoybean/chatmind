import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BsPersonFillAdd,
  BsChatQuoteFill,
  BsFillGearFill,
  BsQuestionCircle
} from 'react-icons/bs'

function Card({ icon, backgroundColor, title, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        width: '100%',
        marginBottom: '16px'
      }}
      onClick={onClick}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          backgroundColor: backgroundColor,
          borderRadius: '8px',
          marginRight: '16px'
        }}
      >
        {icon}
      </div>
      <h3>
        {title}
        <BsQuestionCircle
          size={18}
          color='#4d4d4d'
          style={{
            marginLeft: '8px',
            cursor: 'pointer'
          }}
        />
      </h3>
    </div>
  )
}

function NewChat() {
  const navigate = useNavigate()

  const onClickSkipPrompt = () => {
    console.log('skipping prompts')
    navigate('/chat')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // main axis
        alignItems: 'center', // cross axis
        height: '100vh',
        backgroundColor: '#f8f7fe',
        width: '100%'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Great, let's create a chat!
      </h1>
      <p style={{ marginTop: '0px', marginBottom: '5rem' }}>
        Let's begin with the fundamentals. What role would you like ChatGPT to
        take on?
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Card
          icon={<BsPersonFillAdd size={28} color='#0047AB' />}
          backgroundColor='#e6f2ff'
          title='Choose an avatar'
          onClick={() => console.log('Avatar card clicked')}
        />
        <Card
          icon={<BsChatQuoteFill size={28} color='#C04000' />}
          backgroundColor='#FFDEAD'
          title='Choose a prompt'
          onClick={() => console.log('Prompt card clicked')}
        />
        <Card
          icon={<BsFillGearFill size={28} color='#6B3E8C' />}
          backgroundColor='#E6E6FA'
          title='Choose system config'
          onClick={() => console.log('System config card clicked')}
        />
      </div>
      {/* comment out redundant CTA button for now */}
      <button
        style={{
          padding: '0.8rem 2rem',
          backgroundColor: '#7393B3',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.2rem',
          marginTop: '2rem',
          cursor: 'pointer'
        }}
        onClick={onClickSkipPrompt}
      >
        Skip
      </button>
    </div>
  )
}

export default NewChat
