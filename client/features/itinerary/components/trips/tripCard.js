import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

function TripCard({ city, duration }) {
  return (
    <Link underline='none' href='/singletrip'>
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
              {city}
            </Typography>
            <Typography component='div' color='black' variant='body2'>
              Duration: {duration} day(s)
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default TripCard;
