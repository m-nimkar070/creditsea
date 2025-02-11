import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CreditSea
        </Typography>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/report" style={{ color: 'white', textDecoration: 'none' }}>
          Report
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;