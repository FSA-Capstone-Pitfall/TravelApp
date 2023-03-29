import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserByToken, fetchCities, createTrip } from '../../../store';
import {
  Button,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export default function CreateTrip({ openCreateTrip, toggleDialog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [notification, setNotification] = useState('');
  const cities = useSelector((state) => state.cities.cities);

  const clearLocalState = () => {
    setName('');
    setCity('');
    setNotification('');
  };

  const handleClose = () => {
    clearLocalState();
    toggleDialog();
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setNotification('Please enter trip name.');
    } else if (!city) {
      setNotification('Please enter city.');
    } else {
      const action = await dispatch(getUserByToken());
      const user = action.payload;
      if (user && user.id) {
        const tripCreation = await dispatch(
          createTrip({ userId: user.id, name, city })
        );
        const tripId = tripCreation.payload.itinerary.id;
        setName('');
        setCity('');
        handleClose();
        navigate(`/mytrips/${tripId}`, { replace: true });
      }
    }
  };

  return (
    <Box>
      <Dialog open={openCreateTrip} onClose={handleClose} maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: 'center', paddingTop: '40px' }}>
            <Typography>Create a Trip</Typography>
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
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin='none'
                  required
                  fullWidth
                  id='name'
                  label='Trip Name'
                  name='name'
                  autoComplete='name'
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Select
                  value={city}
                  onChange={handleChange}
                  displayEmpty
                  fullWidth
                  margin='none'
                  required
                >
                  <MenuItem value=''>Select a city</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
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
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
