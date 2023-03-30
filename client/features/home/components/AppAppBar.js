import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ResponsiveAppBar from './AppBar';
import Toolbar from './Toolbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../store';
import { removeUserToken } from '../../../utils';
import { useScrollTrigger } from '@mui/material';
import LoginDialog from './LoginDialog';
import SignupDialog from './SignupDialog';
import SearchBar from './SearchBar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
  textTransform: 'none',
};

const settings = ['Profile', 'Account', 'Logout'];

function AppAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isTransparent, setIsTransparent] = useState(true);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

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
    } else if (selection === 'Profile') {
      navigate(`/users/profile/${userId}`);
    } else if (selection === 'Account') {
      navigate(`/users/account/${userId}`);
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

  const handleOpenLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <div>
      <ResponsiveAppBar
        position='fixed'
        color={trigger ? 'primary' : 'transparent'}
      >
        {' '}
        <Toolbar
          onScroll={handleTrigger}
          sx={{ justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', pl: -2 }}>
            <img
              src='https://i.ibb.co/LJhcbQp/IMG-0599.png'
              alt='pathfinder'
              height='40'
              width='40'
            />
            <Link
              variant='h6'
              underline='none'
              color='white'
              href='/'
              sx={{ fontSize: 16, textTransform: 'none', ml: 1 }}
            >
              {'Pathfinder'}
            </Link>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
          >
            {user ? (
              <>
                <SearchBar />
                <Link
                  variant='h6'
                  underline='none'
                  href='/destinations'
                  sx={{
                    ...rightLink,
                    color: 'white',
                    textTransform: 'none',
                    marginLeft: '20px',
                  }}
                >
                  {'Explore'}
                </Link>
                <Link
                  variant='h6'
                  underline='none'
                  href='/mytrips'
                  sx={{
                    ...rightLink,
                    color: 'white',
                    marginRight: '24px',
                  }}
                >
                  {'Trips'}
                </Link>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
                  {!user.imageUrl ? (
                    <Avatar
                      alt='travel_user'
                      src='https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                    />
                  ) : (
                    <Avatar alt='user_pic' src={user.imageUrl} />
                  )}
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
              </>
            ) : (
              <>
                <SearchBar />

                <LoginDialog
                  color='inherit'
                  variant='h6'
                  underline='none'
                  open={isLoginDialogOpen}
                  onClose={handleCloseLoginDialog}
                />
                <SignupDialog
                  color='inherit'
                  variant='h6'
                  underline='none'
                  open={isLoginDialogOpen}
                  onClose={handleCloseLoginDialog}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </ResponsiveAppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
