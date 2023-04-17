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
  const [newTagColor, setNewTagColor] = useState(null) // default tag color grey

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
    console.log('🚀 promptForm:', promptForm)

    // error if any of the mandatory fields are null
    if (
      !promptForm.field ||
      !promptForm.title ||
      !promptForm.prompt ||
      !promptForm.uuid
    ) {
      toast.error('Invalid Form Input!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      return
    }

    // metadata to store in supabase
    // get user session
    const userData = await supabase.auth.getUser()

    // determine taq color
    // if newTag Color not assigned (null), means its a pre-existing tag, hence should lookup supabase to get the latest color
    let prompt_tag_color
    if (!newTagColor) {
      const { data: latestTagColor, error: getTagColorErr } = await supabase
        .from('prompt_metadata')
        .select('tag_color')
        .eq('field', promptForm.field)
        .order('created_at', { ascending: false }) // use latest if there are many (fingers crossed)
        .limit(1)

      if (latestTagColor) {
        prompt_tag_color = latestTagColor[0].tag_color.toUpperCase()
      }
    } else {
      // else, its a new tag and take what was assigned
      prompt_tag_color = newTagColor.substring(1).toUpperCase()
    }

    const metaData = {
      user_id: userData.data?.user?.id,
      prompt_id: promptForm.uuid,
      field: promptForm.field,
      tag_color: prompt_tag_color
    }

    // insert into supabase
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
        source: promptForm.source,
        title_bg_colour: prompt_tag_color
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
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault()
            }}
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CreatePromptTag
                  tagValue={tagValue}
                  setTagValue={setTagValue}
                  isFormSubmitted={isFormSubmitted}
                  setNewTagColor={setNewTagColor}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete='off'
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
                  autoComplete='off'
                  disabled={isFormSubmitted}
                  fullWidth
                  id='promptDescription'
                  name='promptDescription'
                  label='Prompt Description (optional)'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='off'
                  disabled={isFormSubmitted}
                  required
                  multiline
                  fullWidth
                  id='prompt'
                  name='prompt'
                  label='Prompt'
                  helperText='Put curly braces around dynamic value. i.e. write a topic about {{user input}}'
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
                  autoComplete='off'
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
