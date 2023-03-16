import React, { useEffect } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDestinations } from '../../store/slices/destinationsSlice';

const placeImages = {
  NYC: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  AUSTIN:
    'https://images.unsplash.com/photo-1583512603879-b68fbc57a71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
  YELLOWSTONE:
    'https://images.unsplash.com/photo-1584722721847-e97a39c902e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  SANDIEGO:
    'https://images.unsplash.com/photo-1566353820592-c81f362cbd46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  HONOLULU:
    'https://images.unsplash.com/photo-1603243840535-411d0ff891e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
};
const placeSum = {
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

export default function Destination() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const destinations = useSelector((state) => state.destinations.destinations);
  const uniqueTags = [
    ...new Set(destinations.map((destination) => destination.destinationTag)),
  ];

  const user = useSelector((state) => state.auth.user);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const handleLearnMore = async (location) => {
    navigate(`/destinations/${location}`);
  };

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
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
            Destinations
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='text.secondary'
            paragraph
          >
            Step off the beaten path and immerse yourself in the culture. Taste
            the flavors of the city, hear its stories, and explore its hidden
            corners. You'll discover a new way of seeing the world, one that is
            tailored to your interests and will leave you with memories to last
            a lifetime.
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
            <Button variant='outlined' href={`/users/${userId}/calendar`}>
              View Calendar
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth='md'>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {uniqueTags.map((location) => (
            <Grid item key={location} xs={12} sm={6} md={4}>
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
                  image={placeImages[location]}
                  alt='random'
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {location}
                  </Typography>
                  <Typography>{placeSum[location]}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    sx={{ textTransform: 'none' }}
                    onClick={() => {
                      handleLearnMore(location);
                    }}
                  >
                    Learn More
                  </Button>
                  <Button size='small' sx={{ textTransform: 'none' }}>
                    Generate Itenerary
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
