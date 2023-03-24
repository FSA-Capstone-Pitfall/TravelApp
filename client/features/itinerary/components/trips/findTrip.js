import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Button,
} from '@mui/material';

function FindTrip() {
  return (
    <>
      <Link underline='none' href='/mytrips/1'>
        <Card
          sx={{
            display: 'flex',
            border: '1px solid',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                component='div'
                variant='h1'
                sx={{ marginBottom: '0.3rem', textAlign: 'center' }}
              >
                Find a trip!
                <Button
                  variant='contained'
                  color='primary'
                  href='/destinations'
                  sx={{ width: '100%' }}
                >
                  Explore
                </Button>
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Link>
    </>
  );
}

export default FindTrip;
