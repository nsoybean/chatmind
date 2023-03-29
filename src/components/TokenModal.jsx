import React, { useState } from 'react'
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

  const toggleShow = () => setCentredModal(!centredModal)

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
                // id='form1'
                onFocus={true}
                type='text'
                placeholder='sk-XXXXXXXXXXXXXXX'
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
              <MDBBtn>Save</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
