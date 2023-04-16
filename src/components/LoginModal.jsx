import React, { useState, useEffect, useContext } from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput
} from 'mdb-react-ui-kit'
import { OpenAiAPI } from '../api/openAiAPI'
import general from '../helper/general'
import { FaCheck } from 'react-icons/fa'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { AwesomeButton } from 'react-awesome-button'
import '../styles/awesomeButton/styles.css'
import { Context } from '../context/token'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Button } from '@mui/material'

export default function LoginModal({ showModel, setShowModal, session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null) // const [centredModal, setCentredModal] = useState(false)
  // retrieve token from useContext
  const { supabase } = useContext(Context)

  const toggleShow = () => setShowModal(!showModel)

  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🚀 event:', event)
    if (event === 'SIGNED_IN') {
      setShowModal(false)
    }
  })

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    if (session) {
      getProfile()
    }
  }, [])

  async function updateProfile(event) {
    event.preventDefault()

    // setLoading(true)
    // const { user } = session

    // const updates = {
    //   id: user.id,
    //   username,
    //   website,
    //   avatar_url,
    //   updated_at: new Date()
    // }

    // let { error } = await supabase.from('profiles').upsert(updates)

    // if (error) {
    //   alert(error.message)
    // }
    // setLoading(false)
  }

  return (
    <div style={{ cursor: 'default' }}>
      <MDBModal tabIndex='-1' show={showModel} setShow={setShowModal}>
        <MDBModalDialog centered>
          {/* show login modal if user is not logged in */}
          {!session ? (
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle> Login to Supabase</MDBModalTitle>
                <MDBBtn
                  className='btn-close'
                  color='none'
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <Auth
                  supabaseClient={supabase}
                  // appearance={{ theme: ThemeSupa }}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: 'blue',
                          brandAccent: 'darkblue'
                        }
                      }
                    }
                  }}
                  // providers={['google', 'facebook', 'twitter']}
                  providers={['google']}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          ) : (
            // show account information if user is logged in
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle> Account Settings </MDBModalTitle>
                <MDBBtn
                  className='btn-close'
                  color='none'
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {/* temp commented out user management */}
                {/* <form onSubmit={updateProfile} className='form-widget'>
                  <div>
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      type='text'
                      value={session.user.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor='username'>Name</label>
                    <input
                      id='username'
                      type='text'
                      required
                      value={username || ''}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='website'>Website</label>
                    <input
                      id='website'
                      type='url'
                      value={website || ''}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div>
                    <button
                      className='button block primary'
                      type='submit'
                      disabled={loading}
                    >
                      {loading ? 'Loading ...' : 'Update'}
                    </button>
                  </div>

                  <div>
                    <button
                      className='button block'
                      type='button'
                      onClick={() => supabase.auth.signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                </form> */}
                <div>
                  <TextField
                    disabled
                    label='User Name'
                    value={username}
                    id='outlined-size-small'
                    defaultValue='Small'
                    size='small'
                  />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                {/* <MDBBtn color='secondary' onClick={toggleShow}>
                  Close
                </MDBBtn> */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant='contained'
                    onClick={() => supabase.auth.signOut()}
                  >
                    Log Out
                  </Button>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          )}
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}
