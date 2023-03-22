import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapWithMarkers from './components/map/map';
import BasicTimeline from './components/timeline/timeline';
import BasicTabs from './components/tabs/tabs';
import DemoApp from './components/calendar/calendar';
import MediaControlCard from './components/activity/activityCard';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTrip, fetchTrips } from '../../store/slices/tripsSlice';

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

function MyTrip() {
  const dispatch = useDispatch();
  const tripId = 1;

  const [activities, setActivities] = useState();
  const [city, setCity] = useState();
  const user = useSelector((state) => state.auth.user);
  //const itineraries = useSelector((state) => state.trips.itineraries);
  const selectedTrip = useSelector((state) => state.trips.itineraries);

  let userId;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    const pullData = async () => {
      const userTrip = await dispatch(fetchSingleTrip({ userId, tripId }));
      setActivities(userTrip.payload.itinerary.activities);
      setCity(userTrip.payload.itinerary.city);
    };
    pullData();
  }, [dispatch, userId]);

  let destinations = [];
  if (activities) {
    const locations = activities.map((item) => {
      const coordinates = item.googleMap.split(',');
      return {
        lat: parseFloat(coordinates[0]),
        lng: parseFloat(coordinates[1]),
      };
    });
    destinations = locations;
  }

  const handleDelete = (activityId) => {
    // Update your activities state
    setActivities(activities.filter((activity) => activity.id !== activityId));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <PictureBox sx={{ flexGrow: 1, marginBottom: 3, minHeight: '700px' }}>
        {city ? (
          <>
            <img src={city.imageUrl} alt='Full-width' />
            <h1>{city.name}</h1>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </PictureBox>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <BasicTabs />
                <BasicTimeline activities={activities} />
              </Item>
            </Grid>
            <Grid item xs={6}>
              {/* <Item sx={{ marginBottom: 1 }}>
                {destinations.length > 0 ? (
                  MapWithMarkers(destinations)
                ) : (
                  <h3>Loading...</h3>
                )}
              </Item> */}
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
          <Box sx={{ maxHeight: '1200px', overflowY: 'auto', flex: 1 }}>
            <Item>
              <h2>Trip Details</h2>
              <Box
                sx={{
                  '& > *:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                {activities &&
                  activities.map((activity) => (
                    <MediaControlCard
                      key={activity.id}
                      activity={activity}
                      onDelete={handleDelete} // Pass the onDelete callback
                    />
                  ))}
              </Box>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyTrip;
