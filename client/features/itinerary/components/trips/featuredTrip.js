import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../../../store/slices/tripsSlice';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

function FeaturedTrip({ city, duration }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const itineraries = useSelector((state) => state.trips.itineraries);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(fetchTrips(userId));
  }, [dispatch, userId]);

  console.log('itins: ', itineraries);

  return (
    <>
      {!itineraries[0] ? (
        '...Loading'
      ) : (
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
                  {itineraries[0].itinerary.city.name}{' '}
                </Typography>
                <Typography
                  component='div'
                  variant='body2'
                  sx={{ fontStyle: 'italic', marginBottom: '1rem' }}
                >
                  "Explore Dumbo, Brooklyn like a local by experiencing all the
                  best food, shopping, and waterside activities in the
                  neighborhood!"
                </Typography>
                <Typography component='div' color='secondary' variant='body2'>
                  Duration: {itineraries[0].itinerary.duration} day(s)
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Link>
      )}
    </>
  );
}

export default FeaturedTrip;
