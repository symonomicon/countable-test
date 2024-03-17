import {useEffect, useState} from 'react';
import { Box } from "@mui/material";
import {useNavigate, Outlet} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';

function BaseLayout() {
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
        navigate('/dashboard')
      }
    }, [navigate])
  
    return(
      <Box sx={{ display: 'flex' }}>
        <HeaderBar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
        <Sidebar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
        <Outlet/>
      </Box>
    )
}

export default BaseLayout