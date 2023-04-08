import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Slider, {
  SliderThumb,
  SliderValueLabelProps
} from '@mui/material/Slider'
import { styled, css } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { MDBBtn } from 'mdb-react-ui-kit'
import { useEffect } from 'react'
import '../styles/modelConfigButton/styles.css'

const ConfigureChatButton = ({ chatData, setChatData }) => {
  const [showModal, setShowModal] = useState('')
  const [model, setModel] = useState('gpt-3.5-turbo')
  const [temperature, setTemperature] = useState(0.7)

  const tokenModelMappingTable = {
    'gpt-3.5-turbo': 4096
  }

  const handleModelChange = (event) => {
    setModel(event.target.value)
  }

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue)
  }

  function handleButtonClick() {
    setShowModal(true)
  }

  // slider marks
  const temperatureSliderMarks = [
    {
      value: 0,
      label: 'Deterministic'
    },
    {
      value: 1,
      label: 'Creative'
    }
  ]

  function handleApplyChatConfig() {
    // set chat's modal and token
    setChatData({
      ...chatData,
      model,
      temperature,
      maxToken: tokenModelMappingTable[model]
    })
    // close modal
    setShowModal(false)
  }
  return (
    <div style={{ position: 'relative' }}>
      <div
        className='gear-icon-container' // css selector will determine if 'gear-icon-container' is hovered
        style={{
          borderRadius: '5px',
          width: '190px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          backgroundColor: '#f8f7fe',
          border: '1px solid #CCCCCC',
          cursor: 'pointer',
          zIndex: 2
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.border = '2px solid #0b5fe9'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.border = '1px solid #CCCCCC'
        }}
        onClick={handleButtonClick}
      >
        <i
          className='fas fa-cog fa-lg gear-icon' // css selector will rotate 'gear-icon'
          style={{ color: '#3D3C42', marginRight: '15px' }}
        ></i>
        <div>
          <Typography style={{ color: '#3D3C42' }}>
            <strong>Model: GPT-3.5 </strong> <br />
            Temperature: {chatData?.temperature}
          </Typography>
        </div>
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
            zIndex: 3 // lol, to ensure its most in front
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={{ minWidth: 400 }}>
              <FormControl fullWidth>
                <Typography
                  variant='h6'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '5px'
                    // fontSize: 'large',
                    // fontWeight: 'bold'
                  }}
                >
                  Model Settings
                </Typography>
                <div style={{ marginBottom: '20px' }}>
                  <Typography gutterBottom>
                    <strong>Model</strong>
                  </Typography>
                  <Select
                    id='model'
                    // label='Model'
                    value={model}
                    onChange={handleModelChange}
                  >
                    <MenuItem value={'gpt-3.5-turbo'}>
                      gpt-3.5 (Default)
                    </MenuItem>
                    {/* <MenuItem value={'gpt-3.5'}> gpt-3.5 </MenuItem> */}
                  </Select>
                </div>

                <Typography gutterBottom>
                  <strong>Temperature</strong> <br />
                  <Typography style={{ fontSize: '14px' }}>
                    {' '}
                    Controls the level of randomness or "creativity" in the
                    generated text. <br />
                    Higher temperatures result in more diverse and unpredictable
                    output.
                  </Typography>
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: '70%',
                    marginBottom: '20px'
                  }}
                >
                  <Slider
                    size='medium'
                    aria-label='Temperature'
                    defaultValue={chatData.temperature}
                    valueLabelDisplay='auto'
                    step={0.1}
                    marks={temperatureSliderMarks}
                    min={0}
                    max={1}
                    onChange={handleTemperatureChange}
                  />
                </div>
              </FormControl>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#dcfce7',
                  width: '100%',
                  height: '80px'
                }}
              >
                <Typography style={{ padding: '10px' }}>
                  <strong> Model: </strong>
                  {model} <br />
                  <strong> Max Token: </strong>
                  {tokenModelMappingTable[model].toLocaleString()} (~8,000
                  words) <br />
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: '10px'
                }}
              >
                <MDBBtn
                  style={{ margin: '0px 5px' }}
                  color='secondary'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </MDBBtn>
                <MDBBtn
                  style={{ margin: '0px 5px' }}
                  onClick={() => handleApplyChatConfig()}
                >
                  Apply
                </MDBBtn>
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfigureChatButton
