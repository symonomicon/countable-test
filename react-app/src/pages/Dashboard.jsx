import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import {
  Container,
  Toolbar,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import TimeTracker from '../components/TimeTracker';
import UserProfile from '../components/UserProfile';
import Announcements from '../components/Announcements';


export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    // if (projects.length === 0) {
      axios.get('http://localhost:3000/project')
        .then(({data}) => {
          setProjects(data)
        })
        .finally(() => setLoading(false))
    // }
  }, [])

  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Toolbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <UserProfile/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {
                loading ? (
                  <CircularProgress/>
                ) : <TimeTracker projects={projects}/>
              }
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Announcements/>
            </Paper>
          </Grid>
      </Grid>
    </Container>
  </Box>
  );
}