import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';


export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleSidebar = () => {
    setOpen(!open)
  }
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HeaderBar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
        <Sidebar sidebarOpen={open} toggleSidebar={toggleSidebar}/>
      </Box>
  );
}