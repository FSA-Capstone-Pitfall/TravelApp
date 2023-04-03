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
  textTransform: 'none',
};

export default function SignupDialog({ toggleDialog, openForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);

  const clearLocalState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setNotification('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!firstName) {
      setNotification('Please enter first name.');
    } else if (!lastName) {
      setNotification('Please enter last name.');
    } else if (!email) {
      setNotification('Please enter email.');
    } else if (!password) {
      setNotification('Please enter password.');
    } else {
      try {
        const result = await dispatch(
          authenticate({
            firstName,
            lastName,
            email,
            password,
            method: 'signup',
          })
        );
        if (!result.payload.error) {
          dispatch(getUserByToken());
          clearLocalState();
          navigate('/mytrips', { replace: true });
        } else {
          throw new Error(result.payload.error);
        }
      } catch (error) {
        setNotification('Unable to create account.');
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearLocalState();
  };

  return (
    <Box>
      {!open ? (
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
          {'Sign Up'}
        </Link>
      ) : null}

      {openForm ? (
        <Dialog open={true} onClose={handleClose} maxWidth='xs'>
          <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ textAlign: 'center', paddingTop: '40px' }}>
              <Typography component='h1' variant='h5'>
                Sign Up
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
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    id='confirmPassword'
                    autoComplete='new-password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                Sign up
              </Button>
              <Grid
                container
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                <Grid item>
                  <Link href='/' variant='body2' onClick={toggleDialog}>
                    {'Already have an account? Log In'}
                  </Link>
                </Grid>
              </Grid>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose} maxWidth='xs'>
          <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ textAlign: 'center', paddingTop: '40px' }}>
              <Typography component='h1' variant='h5'>
                Sign Up
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
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    id='confirmPassword'
                    autoComplete='new-password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                Sign up
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Box>
  );
}
