import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTrip } from '../../../../store/slices/tripsSlice';

const Item = styled(Box)(({ theme }) => ({
  padding: 25,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PictureBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  height: '400px',
  marginBottom: '20px',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& h1': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
}));

function UpcomingTrips() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const itineraries = useSelector((state) => state.trips.itineraries);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    const pullData = async () => {
      const userTrip = await dispatch(fetchTrips(userId));
    };
    pullData();
  }, [dispatch, userId]);

  let destinations = [];

  return (
    <Card
      sx={{
        display: 'flex',
        border: '1px solid',
        borderColor: 'black',
        flexGrow: 2,
        padding: '8px',
      }}
    >
      <CardMedia
        component='img'
        sx={{ width: 75, height: 75 }}
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant='body1' color='text.secondary' component='div'>
            San Diego{' '}
          </Typography>
          <Typography component='div' color='black' variant='body2'>
            Duration: 1 day
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default UpcomingTrips;
