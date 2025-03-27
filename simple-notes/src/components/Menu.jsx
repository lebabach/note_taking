import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, 
        Typography } from '@mui/material';

export default function Menu( {userLoggedIn, setUserLoggedIn} ) {

  const logoutUser = () => {
    console.log("Logout clicked");
    setUserLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <AppBar position="static" className='menu-container'>
        <Toolbar sx={{ gap: 5 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">All Notes</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/add-note">Add Note</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userLoggedIn ? <a onClick={logoutUser}>Logout</a> : <Link to="/login">Login</Link>}
          </Typography>
          {!userLoggedIn ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/register">Register</Link>
          </Typography> : ''}
        </Toolbar>
    </AppBar>
  )
}
