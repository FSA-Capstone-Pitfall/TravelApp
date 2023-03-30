import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../../store/slices/tripsSlice';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

function FeaturedTrip() {
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

  return (
    <>
      {!itineraries[0] ? (
        '...Loading'
      ) : (
        <Link underline='none' href={`/mytrips/${itineraries[0].itineraryId}`}>
          <Card className='activity-card' sx={{ display: 'flex', padding: 2 }}>
            <CardMedia
              component='img'
              sx={{ width: 400, height: 325, objectFit: 'cover' }}
              image={itineraries[0].itinerary.imageUrl}
              alt='activity picture'
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5'>
                  {itineraries[0].itinerary.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                  sx={{ marginBottom: '1rem', fontSize: '1.2rem' }}
                >
                  {itineraries[0].itinerary.city.name}{' '}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  Duration: {itineraries[0].itinerary.duration} day
                  {itineraries[0].itinerary.duration > 1 ? 's' : ''}
                </Typography>
                <Typography
                  component='div'
                  color='text.secondary'
                  variant='subtitle1'
                  sx={{
                    fontStyle: 'italic',
                    textTransform: 'capitalize',
                  }}
                >
                  Status: {itineraries[0].status}
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
