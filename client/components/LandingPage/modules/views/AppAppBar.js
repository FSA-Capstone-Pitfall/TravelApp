import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ResponsiveAppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../../store';
import { removeUserToken } from '../../../../utils';

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

  const user = useSelector((state) => state.auth.user);

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

  return (
    <div>
      <ResponsiveAppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
                textTransform: 'none',
              }}
            >
              <Tooltip title='View planned trips'>
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
              </Tooltip>
              <Tooltip title='Explore destinations'>
                <Link
                  color='inherit'
                  variant='h6'
                  underline='none'
                  href='/destinations'
                  sx={{ ...rightLink, marginRight: '16px' }}
                >
                  {'Destinations'}
                </Link>
              </Tooltip>

              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt='Rupinder Singh'
                    src='https://images.unsplash.com/photo-1634484640014-a6e3ae27542c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
                  />
                </IconButton>
              </Tooltip>
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
                sx={rightLink}
              >
                {'Sign In'}
              </Link>
              <Link
                variant='h6'
                underline='none'
                href='/sign-up'
                sx={{
                  ...rightLink,
                  color: 'secondary.main',
                  textTransform: 'none',
                }}
              >
                {'Sign Up'}
              </Link>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/destinations'
                sx={rightLink}
              >
                {'Destinations'}
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
