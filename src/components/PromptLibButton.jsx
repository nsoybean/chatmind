import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import { Container, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PromptCardColumn from '../components/PromptCardColumn'
import { ImBooks } from 'react-icons/im'

import { createClient } from '@supabase/supabase-js'

const supabaseOptions = {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' }
  }
}
const supabase = createClient(
  'https://edtsmqfxjwkadjtzwupl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdHNtcWZ4andrYWRqdHp3dXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NDgxOTksImV4cCI6MTk5NjQyNDE5OX0.jsesB8nxIryrIUSrgUiysgcsavSgbtxcznQriNyl1wc',
  supabaseOptions
)

const PromptLibButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [promptLibrary, setPromptLibrary] = useState(null)

  useEffect(() => {
    async function getAllPrompts() {
      const { data, error } = await supabase.from('Prompts').select()
      console.log(
        '🚀 ~ file: PromptLibButton.jsx:37 ~ getAllPrompts ~ data:',
        data
      )
      setPromptLibrary(data)
    }

    getAllPrompts()
  }, [])

  const handleSearchChange = (event) => {
    console.log('🚀 Searching for prompt:', event.target.value)
    setSearchTerm(event.target.value)
  }
  function handleButtonClick() {
    setShowModal(true)
  }

  // const promptLibrary = []

  // function createRandomUser() {
  //   return {
  //     field: faker.music.genre(),
  //     title: faker.internet.userName(),
  //     prompt: faker.lorem.paragraph(),
  //     source: faker.internet.userName()
  //   }
  // }

  // Array.from({ length: 10 }).forEach(() => {
  //   promptLibrary.push(createRandomUser())
  // })

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          borderRadius: '20px',
          width: '200px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          backgroundColor: '#FF6000',
          border: '1px solid #CCCCCC',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <ImBooks size={24} style={{ marginRight: '5px' }} />
        <Typography> Prompt Library </Typography>
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
                <PromptCardColumn cards={promptLibrary ?? []} />
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptLibButton
