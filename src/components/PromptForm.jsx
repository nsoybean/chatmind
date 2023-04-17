import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CreatePromptTag from './CreatePromptTag'
import { supabase } from '../util/supabaseClient'
import { toast } from 'react-toastify'
import general from '../helper/general'
import { v4 as uuidv4 } from 'uuid'
import { agoliaClientPrompts } from '../util/agoliaClient'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://chatmind-omega.vercel.app/'>
        MindAi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Submit() {
  const [tagValue, setTagValue] = useState(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    let formData = new FormData(event.currentTarget)

    const promptForm = {
      field: tagValue?.field,
      title: formData.get('promptTitle'),
      description: formData.get('promptDescription'),
      prompt: formData.get('prompt'),
      user_name: formData.get('username'),
      source: formData.get('source'),
      uuid: uuidv4()
    }

    // metadata to store in supabase
    const userData = await supabase.auth.getUser()
    const metaData = {
      user_id: userData.data?.user?.id,
      prompt_id: promptForm.uuid
    }

    const { data: createRes, error: createErr } = await general.awaitWrap(
      supabase.from('prompt_metadata').insert([metaData])
    )

    // if prompt created successfully
    if (createRes.status === 201) {
      // disabled submit button
      setIsFormSubmitted(true)

      // create record in agolia
      const agoliaMetaData = {
        objectID: promptForm.uuid,
        field: promptForm.field,
        title: promptForm.title,
        description: promptForm.description,
        prompt: promptForm.prompt,
        user_name: promptForm.user_name,
        source: promptForm.source
      }
      const index = agoliaClientPrompts.initIndex('dev_PROMPTS_2')

      await index.saveObject(agoliaMetaData).then(({ objectIDs }) => {
        console.log(`🚀 prompt saved`)
      })

      // show toast
      toast.success('Prompt Submitted!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AssignmentIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Submit a prompt
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CreatePromptTag
                  tagValue={tagValue}
                  setTagValue={setTagValue}
                  isFormSubmitted={isFormSubmitted}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={isFormSubmitted}
                  required
                  fullWidth
                  id='promptTitle'
                  name='promptTitle'
                  label='Prompt Title'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={isFormSubmitted}
                  fullWidth
                  id='promptDescription'
                  name='promptDescription'
                  label='Prompt Description (optional)'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={isFormSubmitted}
                  required
                  multiline
                  fullWidth
                  id='prompt'
                  name='prompt'
                  label='Prompt'
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '20px'
                }}
              >
                <Typography variant='h6'>
                  Please input your name so we can attribute credit to you
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={isFormSubmitted}
                  fullWidth
                  id='username'
                  name='username'
                  label='username (optional)'
                  helperText='Note: this will be shown to public'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={isFormSubmitted}
                  fullWidth
                  id='source'
                  name='source'
                  label='source (optional)'
                  helperText="Let's give credit where it's due"
                />
              </Grid>
            </Grid>

            <Button
              type='submit'
              disabled={isFormSubmitted}
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit !
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
