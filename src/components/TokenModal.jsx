import React, { useState, useEffect } from 'react'
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

export default function App() {
  const [centredModal, setCentredModal] = useState(false)
  const [inputToken, setInputToken] = useState('')
  const [validatedToken, setValidatedToken] = useState(null)
  const [clickedValidateToken, setClickedValidateToken] = useState(null)
  const [verifyTokenMsg, setVerifyingTokenMsg] = useState(null)
  const [tokenInvalidated, setTokenInvalidated] = useState(true)
  const [showConfettiUponAuthToken, setShowConfettiUponAuthToken] =
    useState(null)

  // retrieve token
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('MA_openai_token'))
    // if token already exist
    if (token) {
      setValidatedToken(token)
    }
  }, [])

  // uncomment for log
  // useEffect(() => {}, [inputToken])

  const toggleShow = () => setCentredModal(!centredModal)

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
        setShowConfettiUponAuthToken(true)
        setTokenInvalidated(false)
        setValidatedToken(trimmedInput)
      } else if (error.code === 'ERR_BAD_REQUEST') {
        setVerifyingTokenMsg('❗ Invalid Token')
        localStorage.setItem(`MA_openai_token`, JSON.stringify(''))
        setValidatedToken(null) // reset token
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
    setValidatedToken(null)
  }
  return (
    <>
      <MDBBtn onClick={toggleShow}>Enter API Key</MDBBtn>

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
                  href='https://platform.openai.com/account/api-keys'
                  style={{
                    color: '#1F51FF' // neon blue
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
                  variant={validatedToken ? 'filled' : 'standard'}
                  disabled={validatedToken ? true : false}
                  value={
                    validatedToken
                      ? maskString(validatedToken, 3, 4)
                      : inputToken
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
                        {validatedToken ? (
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
              {validatedToken ? (
                <MDBBtn onClick={toggleShow}>Close</MDBBtn>
              ) : (
                <MDBBtn onClick={validateToken}>Save</MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
