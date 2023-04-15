import { useState, useEffect } from 'react'

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

import { supabase } from '../util/supabaseClient'
export default function Account({ session, text }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [centredModal, setCentredModal] = useState(false)

  const toggleShow = () => setCentredModal(!centredModal)

  supabase.auth.onAuthStateChange((event, session) => {
    // toggleShow()
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

    getProfile()
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date()
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>{text}</MDBBtn>

      <div>
        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
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
                <form onSubmit={updateProfile} className='form-widget'>
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
                </form>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </>
  )
}
