import React from 'react';
import { Box, Card, CardContent, CardMedia, Link, Typography, } from '@mui/material';

function TripCard({ city, duration, itineraryId, name, image }) {
  return (
    <Link underline="none" href={`/mytrips/${itineraryId}`}>
      <Card
        sx={{
          display: 'flex',
          padding: 2,
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, height: 165 }}
          image={image}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h6" color="primary" component="div">
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              {city}
            </Typography>
            <Typography component="div" color="black" variant="body2">
              Duration: {duration} day{duration > 1 ? 's' : ''}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default TripCard;
