import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ResponsiveAppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../../store';
import { removeUserToken } from '../../../../utils';
import { useScrollTrigger } from '@mui/material';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
  textTransform: 'none',
};

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isTransparent, setIsTransparent] = useState(true);

  const user = useSelector((state) => state.auth.user);

  let userId;
  if (user) {
    userId = user.id;
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = async (selection) => {
    if (selection === 'Logout') {
      dispatch(setUser(null));
      removeUserToken();
      navigate('/');
    } else {
      console.log('You clicked a button!');
    }
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleTrigger = () => {
    setIsTransparent(!trigger);
  };

  return (
    <div>
      <ResponsiveAppBar
        position='fixed'
        color={trigger ? 'primary' : 'transparent'}
        borderradius='20px'
      >
        {' '}
        <Toolbar
          onScroll={handleTrigger}
          sx={{ justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src='https://i.ibb.co/LJhcbQp/IMG-0599.png'
              alt='pathfinder'
              height='44'
              width='44'
            />
            <Link
              variant='h6'
              underline='none'
              color='inherit'
              href='/'
              sx={{ fontSize: 24, textTransform: 'none' }}
            >
              {'Pathfinder'}
            </Link>
          </Box>
          {user ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                textTransform: 'none',
              }}
            >
              <Link
                variant='h6'
                underline='none'
                href='/'
                sx={{
                  ...rightLink,
                  color: 'secondary.main',
                  textTransform: 'none',
                }}
              >
                {'My Trips'}
              </Link>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/destinations'
                sx={{ ...rightLink, marginRight: '16px' }}
              >
                {'Destinations'}
              </Link>

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt='travel_user'
                  src='https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign='center'
                      onClick={() => {
                        handleProfileClick(setting);
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                textTransform: 'none',
              }}
            >
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/login'
                sx={{
                  ...rightLink,
                  color: 'secondary.main',
                  textTransform: 'none',
                }}
              >
                {'Sign In'}
              </Link>
              <Link
                variant='h6'
                underline='none'
                href='/signup'
                sx={{
                  ...rightLink,
                  color: 'secondary.main',
                  textTransform: 'none',
                }}
              >
                {'Sign Up'}
              </Link>
            </Box>
          )}
        </Toolbar>
      </ResponsiveAppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
