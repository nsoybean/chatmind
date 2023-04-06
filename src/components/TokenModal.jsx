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

export default function TokenModal({ text }) {
  const [centredModal, setCentredModal] = useState(false)
  const [inputToken, setInputToken] = useState('')
  const [clickedValidateToken, setClickedValidateToken] = useState(null)
  const [verifyTokenMsg, setVerifyingTokenMsg] = useState(null)
  const [tokenInvalidated, setTokenInvalidated] = useState(true)

  // retrieve token from useContext
  const { openAiToken, setOpenAiToken, setShowConfetti } = useContext(Context)

  const toggleShow = () => setCentredModal(!centredModal)

  // reset confetti after delay, cannot be immmediate otherwise initial confetti wont show
  function resetConfettiAfterDelay() {
    setTimeout(() => {
      setShowConfetti(null)
    }, 1000) // 3 seconds
  }

  // validate input token upon clicking save
  async function validateToken() {
    const trimmedInput = inputToken.trim()
    // return is input is empty
    if (trimmedInput === '') {
      setInputToken('') // clear text input
      return
    }

    // verify token by calling openAI API
    if (trimmedInput) {
      // to show validate msg
      setClickedValidateToken(true)
      setVerifyingTokenMsg('Verifying token...')
      const { data, error } = await general.awaitWrap(
        OpenAiAPI.verifyToken(trimmedInput)
      )

      // if successful
      if (data) {
        setVerifyingTokenMsg('✅ Token Verified')
        localStorage.setItem(`MA_openai_token`, JSON.stringify(trimmedInput))
        setShowConfetti(true)
        setTokenInvalidated(false)
        setOpenAiToken(trimmedInput)
        setInputToken('') // clear text input
        toggleShow() // close modal
        resetConfettiAfterDelay() // reset confetti after 3 seconds
      } else if (error.code === 'ERR_BAD_REQUEST') {
        setVerifyingTokenMsg('❗ Invalid Token')
        localStorage.setItem(`MA_openai_token`, JSON.stringify(''))
        setOpenAiToken(null) // reset token
        setTokenInvalidated(true)
        setInputToken('') // clear text input
      }
    }
  }

  /**
   *
   * @param {string} input
   * @param {number} firstCharLength number of characters to show at the front
   * @param {number} lastCharLength number of characters to show at the back
   * @returns
   */
  function maskString(input, firstCharLength, lastCharLength) {
    var replacementStr =
      input.substring(0, firstCharLength) +
      '.'.repeat(3) +
      input.substring(input.length - lastCharLength, input.length)

    return replacementStr
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      validateToken()
    }
  }

  function changeToken() {
    setOpenAiToken(null)
    setInputToken('')
  }
  return (
    <>
      <MDBBtn onClick={toggleShow}>
        {openAiToken ? maskString(openAiToken, 3, 4) : text}{' '}
      </MDBBtn>

      <div>
        <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle> 🔐 Enter OpenAI API Key</MDBModalTitle>
                <MDBBtn
                  className='btn-close'
                  color='none'
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: '2px 0px'
                  }}
                >
                  <a
                    className='openai-anchor-tag'
                    href='https://platform.openai.com/account/api-keys'
                    style={{
                      color: '#1F51FF' // neon blue
                      // textDecoration: 'underline'
                    }}
                    target='_blank'
                    rel='noreferrer'
                  >
                    → Get your API key from OpenAI
                  </a>
                </div>
                <p style={{ margin: '5px 0px' }}>
                  API key is stored locally in your browser and not sent to any
                  server.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                    // position: 'absolute'
                  }}
                >
                  <TextField
                    id='outlined-helperText'
                    label='Key'
                    variant={openAiToken ? 'filled' : 'standard'}
                    disabled={openAiToken ? true : false}
                    autoComplete='off'
                    value={
                      openAiToken ? maskString(openAiToken, 3, 4) : inputToken
                    }
                    placeholder='sk-XXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    onChange={(e) => setInputToken(e.target.value)}
                    onKeyDown={handleKeyDown}
                    // style={{ flexGrow: 1 }}
                    // style={{ flex: '100%' }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {openAiToken ? (
                            <IconButton
                              edge='end'
                              aria-label='change'
                              onClick={() => changeToken()}
                            >
                              ✏️
                            </IconButton>
                          ) : (
                            ''
                          )}
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  {clickedValidateToken ? verifyTokenMsg : ''}
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                {openAiToken ? (
                  <MDBBtn onClick={toggleShow}>Close</MDBBtn>
                ) : (
                  <MDBBtn onClick={validateToken}>Save</MDBBtn>
                )}
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </>
  )
}
