import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

function ProfileCard({ city, duration, itineraryId, name, imageUrl }) {
  return (
    <Link underline='none' href={`/itineraries/${itineraryId}`}>
      <Card
        className='activity-card'
        sx={{ display: 'flex', padding: 2, mb: 5, width: '140vh' }}
      >
        <CardMedia
          component='img'
          sx={{ width: 200, height: 165, objectFit: 'cover' }}
          image={imageUrl}
          alt='activity picture'
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
              color='black'
              variant='subtitle1'
              sx={{ mt: 6, mb: -2 }}
            >
              Duration: {duration} day{duration === 1 ? '' : 's'}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default ProfileCard;
