import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { ImCool } from 'react-icons/im'
import { IoColorPaletteSharp } from 'react-icons/io5'
import { Context } from '../context/token'
import { TwitterPicker } from 'react-color'

const filter = createFilterOptions()

export default function CreatePromptTag({
  tagValue,
  setTagValue,
  isFormSubmitted,
  setNewTagColor
}) {
  //   const [value, setValue] = useState(null)
  const [open, toggleOpen] = useState(false)
  const [promptTags, setPromptTags] = useState([{ field: '' }])
  const [dialogValue, setDialogValue] = useState({
    field: ''
  })
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

  const handleClose = (event) => {
    event.preventDefault()
    setDialogValue({
      field: ''
    })
    toggleOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTagValue({
      field: dialogValue.field
    })
    handleClose()
  }

  function handleColorChange(color) {
    setNewTagColor(color.hex)
  }

  return (
    <React.Fragment>
      <Autocomplete
        disabled={isFormSubmitted}
        value={tagValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue({
                field: newValue
              })
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue({
              field: newValue.inputValue
            })
          } else {
            setTagValue(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              field: `Add "${params.inputValue}"`
            })
          }

          return filtered
        }}
        id='free-solo-dialog-demo'
        options={promptTags}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.field
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        required
        renderOption={(props, option) => <li {...props}>{option.field}</li>}
        sx={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label='Field/ Industry'
            helperText='Help others find your prompt more easily 😎'
          />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle> Can't find what your tag?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add it! <ImCool />
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              value={dialogValue.field}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  field: event.target.value
                })
              }
              label='Field/ Industry'
              type='text'
              variant='standard'
            />
            <DialogContentText
              style={{ marginTop: '20px', marginBottom: '10px' }}
            >
              Pick a new colour! <IoColorPaletteSharp />
            </DialogContentText>
            <TwitterPicker
              color={'#fff'}
              onChangeComplete={handleColorChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(event) => handleClose(event)}>Cancel</Button>
            <Button variant='contained' type='submit'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
