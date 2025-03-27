import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function Layout( {userLoggedIn, setUserLoggedIn} ) {
  return (
      <div>
        <Typography id='header-text' variant="h1" fontSize={ '3.5rem' } sx={{ marginBottom:3, color: '#F0EBCE' }}>Note Taking</Typography>
        <Menu userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        <div className='main-body'>
          <Outlet />
        </div>
      </div>
  )
}
