import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleClose();
    navigate('/login');
  };

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        {/* Notification Icon */}
        {isLoggedIn && (
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
        )}
        {/* Account Icon with Menu */}
        {isLoggedIn && (
          <>
            <IconButton
              color="inherit"
              aria-label="account"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
        {!isLoggedIn && (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
