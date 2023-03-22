import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

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

function FeaturedTrip() {
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
    <Link underline='none' href='/singletrip'>
      <Card
        sx={{
          display: 'flex',
          border: '1px solid',
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 250 }}
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFy1ZRj0Lz8HeiG73c2jlrHCWpKpxSlqT4Kg&usqp=CAU'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              component='div'
              variant='caption'
              sx={{ marginBottom: '0.3rem' }}
            >
              Featured Trip{' '}
            </Typography>
            <Typography variant='h4' color='primary' component='div'>
              <Link underline='none' href='/singletrip'>
                Downtown Escape
              </Link>
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              component='div'
              sx={{ marginBottom: '1rem' }}
            >
              New York City{' '}
            </Typography>
            <Typography
              component='div'
              variant='body2'
              sx={{ fontStyle: 'italic', marginBottom: '1rem' }}
            >
              "Explore Dumbo, Brooklyn like a local by experiencing all the best
              food, shopping, and waterside activities in the neighborhood!"
            </Typography>
            <Typography component='div' color='secondary' variant='body2'>
              #dumbo #gowanus #brooklyn #bridge #food
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default FeaturedTrip;
