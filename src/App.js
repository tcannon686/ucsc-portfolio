import { useMemo, useState } from 'react'

import './App.css'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { TransitionGroup } from 'react-transition-group'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CssBaseline from '@mui/material/CssBaseline'

import projects from './projects'

function Project ({ project: { title, description, screenshots, video, links } }) {
  const [selectedImage, setSelectedImage] = useState(null)
  return (
    <>
      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>
      {video && (
        <Box textAlign='center'>
          <iframe
            width='560'
            height='315'
            src={video}
            frameborder='0'
            allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
            class='video'
            allowfullscreen
          />
        </Box>
      )}
      <ImageList cols={3}>
        {screenshots && screenshots.map(image => (
          <ImageListItem
            key={image}
          >
            <img
              src={`${process.env.PUBLIC_URL}/projects/${image}`}
              alt={image}
              loading='lazy'
              onClick={() => { setSelectedImage(image) }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Typography paragraph>
        {description}
      </Typography>
      {links && (
        <Stack direction='row' spacing={1} justifyContent='space-around'>
          {links.map(({ link, text }) => (
            <Link key={text} href={link}>{text}</Link>
          ))}
        </Stack>
      )}
      <Modal
        open={Boolean(selectedImage)}
        onClose={() => { setSelectedImage(null) }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 1,
            height: 1
          }}
          onClick={() => { setSelectedImage(null) }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/projects/${selectedImage}`}
            alt={selectedImage}
            style={{
              maxHeight: '100%',
              maxWidth: '100%'
            }}
          />
        </Box>
      </Modal>
    </>
  )
}

function App () {
  const tags = useMemo(() => (
    projects.projects
      .flatMap(({ tags }) => tags)
      .sort()
      .filter((_, i, a) => a[i] !== a[i - 1])
  ), [projects.projects])
  const [filters, setFilters] = useState([])
  const displayedProjects = useMemo(() => (
    projects.projects.filter(project => (
      filters.every(filter => project.tags.includes(filter))
    ))
  ), [projects.projects, filters])

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box>
          <Typography variant='h2' textAlign='center' gutterBottom>
            Thomas Cannon
          </Typography>
          <Stack
            direction='row'
            flexWrap='wrap'
          >
            {tags.map(tag => (
              <Box m={0.5} key={tag}>
                <Chip
                  label={tag}
                  onClick={() => {
                    if (filters.includes(tag)) {
                      setFilters(filters.filter(x => x !== tag))
                    } else {
                      setFilters([...filters, tag])
                    }
                  }}
                  color={filters.includes(tag) ? 'primary' : 'default'}
                />
              </Box>
            ))}
          </Stack>
          <Stack>
            <TransitionGroup>
              {displayedProjects.map((project, i, a) => (
                <Collapse key={project.id}>
                  <Box m={1} sx={{ mt: theme => theme.spacing(4) }}>
                    <Project project={project} />
                  </Box>
                </Collapse>
              ))}
            </TransitionGroup>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default App
