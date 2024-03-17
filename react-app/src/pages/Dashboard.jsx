import Box from '@mui/material/Box';
import {
  Container,
  Toolbar,
  Grid,
  Paper
} from '@mui/material'
import TimeTracker from '../components/TimeTracker';
import UserProfile from '../components/UserProfile';
import Announcements from '../components/Announcements';


const PROJECTS = [
    'Quen',
    'Aard',
    'Igni',
    'Axii',
    'Yrden'
]

export default function Dashboard() {
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
              <TimeTracker projects={PROJECTS}/>
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