import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, getUserByToken } from '../../../store';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
  mr: 3,
  textTransform: 'none',
};

export default function LoginDialog({ toggleDialog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState();
  const [open, setOpen] = useState(false);

  const clearLocalState = () => {
    setEmail('');
    setPassword('');
    setNotification('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearLocalState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setNotification('Please enter email.');
    } else if (!password) {
      setNotification('Please enter password.');
    } else {
      const result = await dispatch(
        authenticate({ email, password, method: 'login' })
      );
      if (result.payload && result.payload.error) {
        setNotification('Invalid username or password.');
      } else {
        await dispatch(getUserByToken());
        setEmail('');
        setPassword('');
        navigate('/mytrips', { replace: true });
      }
    }
  };

  return (
    <Box>
      <Link
        color='inherit'
        variant='h6'
        underline='none'
        onClick={handleClickOpen}
        sx={{
          ...rightLink,
          color: 'white',
          cursor: 'pointer',
        }}
      >
        {'Login'}
      </Link>
      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: 'center', paddingTop: '40px' }}>
            <Typography component='h1' variant='h5'>
              Log Into Pathfinder
            </Typography>
            <IconButton
              aria-label='close'
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 0,
              pl: 3,
              pr: 3,
              pb: 4,
            }}
          >
            {notification && (
              <Typography
                align='center'
                sx={{
                  color: 'red',
                  mt: -3,
                }}
              >
                {notification}
              </Typography>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}
            >
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
