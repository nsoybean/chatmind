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
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import 'instantsearch.css/themes/satellite.css'
import { IoIosCreate } from 'react-icons/io'
import { MDBBtn } from 'mdb-react-ui-kit'
import Button from '@mui/material/Button'
import { IoCreate } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { agoliaClientPrompts } from '../util/agoliaClient'
import { supabase } from '../util/supabaseClient'
import general from '../helper/general'
import { toast } from 'react-toastify'

const PromptLibButton = () => {
  const [showModal, setShowModal] = useState(false)

  function handleButtonClick() {
    setShowModal(true)
  }

  async function authCreateNewPrompt() {
    const { data: userSession, error } = await general.awaitWrap(
      supabase.auth.getSession()
    )

    // if access token exist (logged in)
    if (userSession?.data?.session?.access_token) {
      window.open('/new-prompt')
    } else {
      toast.warn('Please sign in to create prompts 😎', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
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
                searchClient={agoliaClientPrompts}
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
                    variant='text'
                    sx={{
                      marginLeft: 'auto',
                      height: '40px',
                      width: '110px',
                      borderRadius: '5px',
                      backgroundColor: '#0095ff',
                      color: 'white',
                      ':hover': {
                        backgroundColor: '#007be6',
                        color: 'white'
                      }
                    }}
                    // target='_blank'
                    // component={Link}
                    // to='/new-prompt'
                    onClick={authCreateNewPrompt}
                  >
                    {/* <IoCreate size={20} /> */}
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
