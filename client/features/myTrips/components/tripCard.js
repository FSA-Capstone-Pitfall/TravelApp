import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';

function TripCard({ city, duration, itineraryId, name, image, status }) {
  return (
    <Link underline='none' href={`/mytrips/${itineraryId}`}>
      <Card
        sx={{
          display: 'flex',
          flexGrow: 2,
          padding: 2,
          mb: 5,
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 200, height: 165, objectFit: 'cover' }}
          image={image}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h5'>
              {name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            >
              {city}
            </Typography>
            <Typography
              component='div'
              color='text.secondary'
              variant='subtitle1'
            >
              Duration: {duration} day{duration === 1 ? '' : 's'}
            </Typography>
            <Typography
              component='div'
              color='text.secondary'
              variant='subtitle1'
              sx={{
                fontStyle: 'italic',
                textTransform: 'capitalize',
                mt: 2,
                mb: -2,
              }}
            >
              Status: {status}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default TripCard;
