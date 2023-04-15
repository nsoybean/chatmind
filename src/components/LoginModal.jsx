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

export default function LoginModal({ text }) {
  const [centredModal, setCentredModal] = useState(false)
  // retrieve token from useContext
  const { supabase } = useContext(Context)

  const toggleShow = () => setCentredModal(!centredModal)

  supabase.auth.onAuthStateChange((event, session) => {
    // toggleShow()
  })

  return (
    <>
      <MDBBtn color='secondary' onClick={toggleShow}>
        {text}
      </MDBBtn>

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
          </MDBModalDialog>
        </MDBModal>
      </div>
    </>
  )
}
