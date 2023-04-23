import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { Context } from '../context/token'
import { CirclePicker } from 'react-color'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

const filter = createFilterOptions()

export default function FreeSoloCreateOption({
  tagValue,
  setTagValue,
  newTagColor,
  setNewTagColor,
  isFormSubmitted
}) {
  // const [value, setValue] = useState(null)
  const [promptTags, setPromptTags] = useState([{ field: '' }])
  const [isNewTag, setIsNewTag] = useState(null)
  const [isPickingColor, setIsPickingColor] = useState(false)
  const { supabase } = useContext(Context)

  useEffect(() => {
    async function getAndSetDistinctTags() {
      const { data: distinctTags, error } = await supabase
        .from('distinct_prompt_field')
        .select('field')

      setPromptTags(distinctTags)
    }

    getAndSetDistinctTags()
  }, [])

  function handleColorChange(color) {
    setNewTagColor(color.hex)
    setIsPickingColor(!isPickingColor)
  }

  function toggleColorPicker(event) {
    setIsPickingColor(!isPickingColor)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Autocomplete
        value={tagValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // setValue({
            //   field: newValue
            // })
            setTagValue(null)
            setIsNewTag(false)
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setIsNewTag(true)
            setTagValue({
              field: newValue.inputValue
            })
          } else {
            setIsNewTag(false)
            setTagValue(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params

          // Suggest the creation of a new value
          const isExisting = options.some((option) => {
            return inputValue.toLowerCase() === option.field.toLowerCase()
          })
          if (inputValue !== '' && !isExisting) {
            const inputLowerCased = {
              inputValue: inputValue.toLowerCase(),
              field: `Add "${inputValue.toLowerCase()}"`
            }
            filtered.push(inputLowerCased)
          }

          return filtered
        }}
        selectOnFocus
        required
        clearOnBlur
        handleHomeEndKeys
        id='free-solo-with-text-demo'
        options={promptTags}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.field
        }}
        renderOption={(props, option) => <li {...props}>{option.field}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            readOnly={isFormSubmitted}
            required
            label='Field/ Industry'
          />
        )}
      />
      {/* show color picker if tag is new */}
      {isNewTag && (
        <>
          <Button
            style={{
              width: '2rem',
              height: '2em',
              backgroundColor: newTagColor ?? '#F3F1F5',
              border: '1px solid #333',
              borderRadius: '0.25rem',
              marginTop: '0.5rem',
              cursor: 'pointer'
            }}
            onClick={(event) => toggleColorPicker(event)}
          ></Button>
          {/* show color palette if user clicks to change default colour */}
          <Dialog onClose={toggleColorPicker} open={isPickingColor}>
            <DialogTitle> Pick a color </DialogTitle>
            <div style={{ padding: '20px 30px' }}>
              <CirclePicker
                color={'#fff'}
                onChangeComplete={handleColorChange}
              />
            </div>
          </Dialog>
        </>
      )}
    </div>
  )
}
