import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MapWithMarkers from './components/map/map';
import BasicTimeline from './components/timeline/timeline';
import BasicTabs from './components/tabs/tabs';
import DemoApp from './components/calendar/calendar';
import MediaControlCard from './components/activity/activityCard';
import Button from '@mui/material/Button';

const Item = styled(Box)(({ theme }) => ({
  padding: 25,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PictureBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  height: '400px',
  marginBottom: '20px',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& h1': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
}));

const destinations = [
  { lat: 37.7576948, lng: -122.4726194 }, // Twin Peaks
  { lat: 37.7694208, lng: -122.4862138 }, // Golden Gate Park
  { lat: 37.783333, lng: -122.464444 }, // California Academy of Sciences
  { lat: 37.770091, lng: -122.467064 }, // de Young Museum
  { lat: 37.802372, lng: -122.448248 }, // Palace of Fine Arts Theatre
  { lat: 37.807601, lng: -122.475163 }, // Ghirardelli Square
  { lat: 37.810111, lng: -122.477222 }, // Fisherman's Wharf
];

function MyTrip() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <PictureBox sx={{ flexGrow: 1, marginBottom: 3 }}>
        <img src='https://picsum.photos/2000/1000' alt='Full-width' />
        <h1>Centered Text</h1>
      </PictureBox>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <BasicTabs />
                <BasicTimeline />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                {MapWithMarkers(destinations)}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <DemoApp />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Box sx={{ marginBottom: '16px' }}>
                    <Button
                      variant='contained'
                      size='large'
                      sx={{ display: 'block', width: '100%' }}
                    >
                      Travel Companions
                    </Button>
                  </Box>
                  <Box sx={{ marginBottom: '16px' }}>
                    <Button
                      variant='contained'
                      size='large'
                      sx={{ display: 'block', width: '100%' }}
                    >
                      Travel Budget
                    </Button>
                  </Box>
                  <Button
                    variant='contained'
                    size='large'
                    sx={{ display: 'block', width: '100%' }}
                  >
                    Transportation Plans
                  </Button>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'left' }}>
          <Box sx={{ maxHeight: '1100px', overflowY: 'auto', flex: 1 }}>
            <Item>
              <h2>Sunday</h2>
              <Box
                sx={{
                  '& > *:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                <MediaControlCard />
                <MediaControlCard />
                <MediaControlCard />
              </Box>
              <h2>Monday</h2>
              <Box
                sx={{
                  '& > *:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                <MediaControlCard />
                <MediaControlCard />
                <MediaControlCard />
              </Box>
              <h2>Tuesday</h2>
              <Box
                sx={{
                  '& > *:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                <MediaControlCard />
                <MediaControlCard />
                <MediaControlCard />
              </Box>
              <h2>Wednesday</h2>
              <Box
                sx={{
                  '& > *:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                <MediaControlCard />
                <MediaControlCard />
                <MediaControlCard />
              </Box>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyTrip;
