import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import { Container, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PromptCardColumn from '../components/PromptCardColumn'

const PromptLibButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    console.log('🚀 Searching for prompt:', event.target.value)
    setSearchTerm(event.target.value)
  }
  function handleButtonClick() {
    setShowModal(true)
  }

  const promptLibrary = []

  function createRandomUser() {
    return {
      field: faker.music.genre(),
      title: faker.internet.userName(),
      prompt: faker.lorem.paragraph(),
      source: faker.internet.userName()
    }
  }

  Array.from({ length: 10 }).forEach(() => {
    promptLibrary.push(createRandomUser())
  })

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
            {/* title */}
            <Typography
              variant='h6'
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '5px'
              }}
            >
              Prompt Library
            </Typography>

            <Container maxWidth='md' sx={{ my: '20px' }}>
              {/* search bar */}
              <TextField
                id='search'
                type='search'
                label='Search'
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: '100%', paddingBottom: '10px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />

              {/* prompt cards */}
              <div>
                <PromptCardColumn cards={promptLibrary} />
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptLibButton
