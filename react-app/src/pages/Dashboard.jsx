import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open)
  }
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [navigate])

  return (
      <Box sx={{ display: 'flex' }}>
        <HeaderBar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
        <Sidebar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
      </Box>
  );
}