import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Link,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTrip, fetchTrips } from '../../store/slices/tripsSlice';
import {
  WishlistTrips,
  FeaturedTrip,
  CuratedTrips,
  UpcomingTrips,
} from './components/trips';

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

function AllTrips() {
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
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <PictureBox sx={{ flexGrow: 1, marginBottom: 3, minHeight: '700px' }}>
        <>
          <img
            src='https://justinkelefas.com/wp-content/uploads/2022/04/New-York-City-Sunset-sample-2.jpg'
            alt='Full-width'
          />
          <h1>My Trips</h1>
        </>
      </PictureBox>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',

          gap: '0.5rem',
        }}
      >
        <FeaturedTrip />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='caption'>
                    Upcoming Trips{' '}
                  </Typography>
                  <UpcomingTrips />
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='caption'>
                    My Curated Trips{' '}
                  </Typography>
                  <CuratedTrips />
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component='div' variant='caption'>
                    Wishlist{' '}
                  </Typography>
                  <WishlistTrips />{' '}
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AllTrips;