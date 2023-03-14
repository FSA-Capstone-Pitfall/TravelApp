import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../components/LandingPage/modules/theme';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleDestination } from '../../store/slices/destinationsSlice';

const placeImages = {
  NYC: 'https://images.unsplash.com/photo-1547452912-6972ef22a5ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  AUSTIN:
    'https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
  YELLOWSTONE:
    'https://images.unsplash.com/photo-1529439322271-42931c09bce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  SANDIEGO:
    'https://images.unsplash.com/photo-1566353820592-c81f362cbd46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  HONOLULU:
    'https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
};
const summary = {
  NYC: 'NYC is a top destination, offering an array of experiences for visitors including world-renowned museums, Broadway shows, diverse cuisine, and iconic landmarks such as the Empire State Building and the Brooklyn Bridge. With so much to see and do, a trip to NYC promises to be an unforgettable vacation.',
  AUSTIN:
    "Austin, Texas is a vibrant and eclectic city with a unique blend of music, art, and outdoor activities. As a top destination for foodies and beer enthusiasts, visitors can enjoy a variety of culinary delights and local brews while exploring the city's lively music scene, stunning parks, and distinctive neighborhoods.",
  YELLOWSTONE:
    "Yellowstone National Park is a stunning destination for nature lovers, with its geothermal features, spectacular waterfalls, and diverse wildlife. Visitors can explore the park's many hiking trails, take in breathtaking views, and experience the beauty of the great outdoors.",
  SANDIEGO:
    'San Diego, California is a premier vacation destination offering visitors miles of pristine beaches, a vibrant downtown area, world-class attractions, and a rich cultural heritage. With its mild climate, endless sunshine, and laid-back atmosphere, San Diego is the perfect place to relax and enjoy a wide range of outdoor activities, including surfing, hiking, and sailing.',
  HONOLULU:
    'Honolulu, the capital of Hawaii, is known for its beautiful beaches, crystal clear waters and lush vegetation. Visitors can experience Hawaiian culture, history and adventure with activities such as hiking, surfing, and exploring museums and gardens.',
};

export default function SingleDestination() {
  const dispatch = useDispatch();
  const { location } = useParams();
  const destinations = useSelector((state) => state.destinations.destinations);

  const user = useSelector((state) => state.auth.user);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    if (location) {
      dispatch(fetchSingleDestination(location));
    }
  }, [dispatch, location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundImage: `url(${placeImages[location]})`,
            pt: 8,
            pb: 6,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              {location}
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='text.primary'
              fontWeight='bold'
              paragraph
            >
              {summary[location]}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              <Button variant='contained' href={`/users/${userId}/calendar`}>
                Schedule Your Consultation
              </Button>
              <Button variant='contained' href={`/users/${userId}/calendar`}>
                View Calendar
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {destinations.map((site) => (
              <Grid item key={site.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{
                      // 16:9
                      pt: '5%',
                    }}
                    image='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80'
                    alt='random'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {site.name}
                    </Typography>
                    <Typography>{site.category}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small' sx={{ textTransform: 'none' }}>
                      Learn More
                    </Button>
                    <Button size='small' sx={{ textTransform: 'none' }}>
                      Add to Itenerary
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
