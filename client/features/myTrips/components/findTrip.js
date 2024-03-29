import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

function FindTrip() {
  return (
    <>
      <Card className='activity-card' sx={{ display: 'flex', padding: 2 }}>
        <CardMedia
          component='img'
          sx={{ width: 200, height: 165, objectFit: 'cover' }}
          image='https://www.traveloffpath.com/wp-content/uploads/2022/04/flight-take-off-sunset.jpg'
          alt='activity picture'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h5'>
              Need ideas?
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            >
              Find cities, itineraries and more
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              href='/destinations'
              sx={{ marginTop: 4 }}
            >
              Explore
            </Button>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}

export default FindTrip;
