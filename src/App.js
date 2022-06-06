import { useMemo, useState } from 'react'

import './App.css'
import ResumePdf from './Resume.pdf'
import MeJpg from './Me.jpg'

// MUI
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

// React Router
import { Routes, Route, BrowserRouter, Link as RouterLink } from 'react-router-dom'

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
            frameBorder='0'
            width='560'
            height='315'
            src={video}
          />
        </Box>
      )}
      {screenshots && (
        <ImageList cols={3}>
          {screenshots.map(image => (
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
      )}
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

function Projects () {
  const tags = useMemo(() => (
    projects.projects
      .flatMap(({ tags }) => tags)
      .sort()
      .filter((_, i, a) => a[i] !== a[i - 1])
  ), [])
  const [filters, setFilters] = useState([])
  const displayedProjects = useMemo(() => (
    projects.projects.filter(project => (
      filters.every(filter => project.tags.includes(filter))
    ))
  ), [filters])

  return (
    <>
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
    </>
  )
}

function Splash () {
  return (
    <>
      <Typography variant='h4' gutterBottom>Welcome</Typography>
      <Typography paragraph>
        Hello and welcome to my portfolio site! I am Tom, a programmer from San
        Jose, California. I am currently an intern at NASA Ames Research Center,
        where I am developing visualization tools for traverse planning software
        for the VIPER rover. I love my internship at NASA because I work
        with a team of highly intelligent people on an important part of the
        mission, and I get to use React and three.js every day! I also learned a
        lot about map projections and tools like GDAL and proj to create maps of
        the moon, which I think is pretty cool.
      </Typography>
      <Typography>
        If you'd like to see some of my personal projects, please check out
        the <Link component={RouterLink} to='/projects'>Projects</Link> page.
        Otherwise, I hope we will stay
        in <Link component={RouterLink} to='/contact'>contact</Link> or connect on LinkedIn!
      </Typography>
      <Stack direction='row' justifyContent='center'>
        <img src={MeJpg} />
      </Stack>
    </>
  )
}

function Contact () {
  return (
    <>
      <Typography variant='h4' gutterBottom>Contact</Typography>
      <Typography paragraph>
        Please contact me with the information below if you have any
        suggestions, comments, or concerns. Thanks!
      </Typography>
      <Typography variant='h6'> Email </Typography>
      <Typography> Thomas Cannon </Typography>
      <Typography paragraph>
        <Link href='mailto:tom-cannon@playcannon.com'>
          tom-cannon@playcannon.com
        </Link>
      </Typography>
      <Typography variant='h6'> Resume </Typography>
      <Typography paragraph><Link href={ResumePdf}>Resume PDF</Link></Typography>
      <Typography variant='h6'> Social Media </Typography>
      <Typography>
        <Link href='https://www.linkedin.com/in/thomas-cannon-572213159'>LinkedIn</Link>
      </Typography>
      <Typography paragraph>
        <Link href='https://github.com/tcannon686'>GitHub</Link>
      </Typography>
    </>
  )
}

function App () {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box p={4}>
          <Typography
            variant='h2'
            textAlign='center'
          >
            Thomas Cannon
          </Typography>
          <Stack direction='row' justifyContent='space-around' pb={4}>
            <Link component={RouterLink} to='/'>Home</Link>
            <Link component={RouterLink} to='/projects'>Projects</Link>
            <Link component={RouterLink} to='/contact'>Contact</Link>
          </Stack>
          <Routes>
            <Route path='/' element={<Splash />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  )
}

export default App
