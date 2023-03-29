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
export default function App() {
  const [centredModal, setCentredModal] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    console.log('token', token)
  }, [token])

  const toggleShow = () => setCentredModal(!centredModal)

  const saveToken = () => {
    localStorage.setItem(`MA_openai_token`, JSON.stringify(token))
    toggleShow()
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
              <MDBInput
                label='Key'
                type='text'
                placeholder='sk-XXXXXXXXXXXXXXX'
                onChange={(e) => setToken(e.target.value)}
              />
              <div style={{ margin: '10px 0px' }}>
                <a
                  href='https://platform.openai.com/account/api-keys'
                  style={{
                    color: 'blue',
                    textDecoration: 'underline'
                  }}
                  target='_blank'
                  rel='noreferrer'
                >
                  Get your API key from OpenAI
                </a>
              </div>
              <p style={{ margin: '10px 0px' }}>
                API key is stored locally in your browser and not stored in any
                server.
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              {/* <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn> */}
              <MDBBtn onClick={saveToken}>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
