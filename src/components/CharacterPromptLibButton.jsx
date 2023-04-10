import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { faker } from '@faker-js/faker'
import { Container, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CharacterPromptCards from './CharacterPromptCards'
import CharacterPromptCard from './CharacterPromptCard'
import { BsPersonCircle } from 'react-icons/bs'
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
  InfiniteHits
} from 'react-instantsearch-hooks-web'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import { searchBox } from 'instantsearch.js/es/widgets'
import algoliasearch from 'algoliasearch'
import { Autocomplete } from './AgoliaAutoComplete'
import { createClient } from '@supabase/supabase-js'
// Include only the reset
// import 'instantsearch.css/themes/reset.css'
// or include the full Satellite theme
import 'instantsearch.css/themes/satellite.css'

const searchClient = algoliasearch(
  'XRUEQYGG84', // app ID
  'ab1aeb2d7d64639e7074032d6440cd30' //Search-Only API Key
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

// function Hit({ hit }) {
//   return (
//     <article>
//       {/* <img src={hit.image} alt={hit.name} /> */}
//       {/* <p>{hit.categories[0]}</p> */}
//       <h1>{hit.act}</h1>
//       <p>{hit.prompt}</p>
//     </article>
//   )
// }

const CharacterPromptLibButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [promptLibrary, setPromptLibrary] = useState(null)

  // fetch prompts when modal is open
  useEffect(() => {
    async function getAllPrompts() {
      const { data, error } = await supabase.from('Character').select()
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
          backgroundColor: '#5463FF',
          border: '1px solid #CCCCCC',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <BsPersonCircle size={24} style={{ marginRight: '5px' }} />
        <Typography> Choose ChatGPT role </Typography>
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
            zIndex: 1
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* title */}
              <Typography
                variant='h6'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px'
                }}
              >
                ChatGPT to act as... <br />
              </Typography>

              <Container maxWidth='md' sx={{ my: '20px' }}>
                {/* search bar */}
                <InstantSearch
                  searchClient={searchClient}
                  indexName='dev_PROMPTS'
                >
                  <Configure />
                  {/* temp comment out hits per page */}
                  {/* <Configure hitsPerPage={5} /> */}
                  <SearchBox
                    autoFocus={true}
                    placeholder={'Search for prompts'}
                  />
                  <div
                    className='card-container'
                    style={{
                      width: '100%',
                      maxHeight: '500px',
                      overflow: 'auto'
                    }}
                  >
                    <Hits hitComponent={CharacterPromptCard} />
                  </div>
                  {/* <InfiniteHits hitComponent={CharacterPromptCard} /> */}
                </InstantSearch>

                {/* prompt cards */}
                {/* <div>
                <CharacterPromptCards cards={promptLibrary ?? []} />
              </div> */}
              </Container>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterPromptLibButton
