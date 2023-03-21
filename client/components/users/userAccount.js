import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser, updateUser } from '../../store/slices/usersSlice';
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
} from '@mui/material';

const UserAccount = ({ userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const loggedUser = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userState, setUserState] = useState('');
  const [city, setCity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [update, setUpdate] = useState('');

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setCity(selectedUser.city);
      setUserState(selectedUser.state);
      setImageUrl(selectedUser.imageUrl);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user && user.id) {
      if (loggedUser.role !== 'admin' && user.id !== loggedUser.id) {
        console.error('You cannot edit this profile!');
        return;
      }
      try {
        await dispatch(
          updateUser({
            id: user.id,
            firstName,
            lastName,
            city,
            state: userState,
            imageUrl,
            email,
          })
        );
        setUpdate('User info has been updated.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  marginBottom: 1,
                  maxWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Avatar
                  src={imageUrl}
                  sx={{ height: '200px', width: '200px' }}
                />
                <Box
                  component='div'
                  sx={{ textAlign: 'left', display: 'block', mb: 1 }}
                >
                  <Button variant='outlined' sx={{ mt: 2, ml: '36px' }}>
                    Edit photo
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Box>
              <Typography variant='h4'>Account Info</Typography>
              <Box
                component='form'
                onSubmit={handleUpdate}
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  margin='normal'
                  id='firstName'
                  name='firstName'
                  label='First Name'
                  value={firstName}
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  margin='normal'
                  id='lastName'
                  name='lastName'
                  label='Last Name'
                  value={lastName}
                  autoFocus
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  margin='normal'
                  id='city'
                  name='city'
                  label='City'
                  value={city}
                  autoFocus
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                  margin='normal'
                  id='state'
                  name='state'
                  label='State'
                  value={userState}
                  autoFocus
                  onChange={(e) => setUserState(e.target.value)}
                />
                <TextField
                  margin='normal'
                  id='imageUrl'
                  name='imageUrl'
                  label='Avatar'
                  value={imageUrl}
                  autoFocus
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <TextField
                  margin='normal'
                  id='email'
                  name='email'
                  type='email'
                  label='Email'
                  value={email}
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                {update}
                <Button type='submit' variant='contained' color='primary'>
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserAccount;
