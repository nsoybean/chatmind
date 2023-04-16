import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import { Container, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PromptCards from './PromptCards'
import { ImBooks } from 'react-icons/im'
import PromptCard from './PromptCard'
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  InfiniteHits
} from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch'
import { createClient } from '@supabase/supabase-js'
import 'instantsearch.css/themes/satellite.css'
import { IoIosCreate } from 'react-icons/io'
import { MDBBtn } from 'mdb-react-ui-kit'
import Button from '@mui/material/Button'
import { IoCreate } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const searchClient = algoliasearch(
  'XRUEQYGG84', // app ID
  'a8b499f1610dfa33662cf441d46cfe68' //Search-Only API Key
)

const supabaseOptions = {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
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

  // fetch prompts when modal is open
  useEffect(() => {
    async function getAllPrompts() {
      const { data, error } = await supabase.from('Prompts').select()
      if (data) {
        setPromptLibrary(data)
      }
    }

    if (showModal) {
      getAllPrompts()
    }
  }, [showModal])

  const handleSearchChange = (event) => {
    // console.log('🚀 Searching for prompt:', event.target.value)
    setSearchTerm(event.target.value)
  }
  function handleButtonClick() {
    setShowModal(true)
  }

  // mock prompt using faker
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

  function submitPrompt() {
    console.log('creating new prompt...')
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          borderRadius: '20px',
          width: '220px',
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

              <InstantSearch
                searchClient={searchClient}
                indexName='dev_PROMPTS_2'
              >
                {/* <Configure /> */}
                {/* temp comment out hits per page */}
                {/* <Configure hitsPerPage={5} /> */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <SearchBox
                    autoFocus={true}
                    placeholder={'Search for prompts'}
                    style={{ width: '85%' }}
                  />

                  {/* Create a prompt! */}
                  <Button
                    variant='contained'
                    sx={{
                      marginLeft: 'auto',
                      height: '40px',
                      width: '110px',
                      borderRadius: '5px'
                    }}
                    component={Link}
                    to='/new-prompt'
                  >
                    <IoCreate size={20} />
                    Create
                  </Button>
                </div>
                <div
                  className='card-container'
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    overflow: 'auto'
                  }}
                >
                  <Hits hitComponent={PromptCard} />
                </div>
              </InstantSearch>
            </Container>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptLibButton
