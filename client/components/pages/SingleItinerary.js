import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapWithMarkers from '../../features/itinerary/components/map/map';
import BasicTimeline from '../../features/itinerary/components/timeline/timeline';
import ActivityList from '../../features/itinerary/components/activity/activityList';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItinerary } from '../../store';
import { Typography } from '@mui/material';


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

const SingleItinerary = () => {
  const dispatch = useDispatch();
  const { itineraryId } = useParams();

  const itinerary = useSelector((state) => state.itineraries.itinerary);

  useEffect(() => {
    dispatch(fetchItinerary({ itineraryId }));
  }, [dispatch]);

  if (!itinerary) return null;

  let destinations = itinerary.activities.map((activity) => {
    const coordinates = activity.googleMap.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1]),
    };
  });

  let tripDuration = 0;
  if (itinerary.activities && itinerary.activities.length > 0) {
    const startDate = new Date(itinerary.activities[0].itinerary_activity.date);
    const endDate = new Date(
      itinerary.activities[itinerary.activities.length - 1].itinerary_activity.date
    );
    tripDuration = Math.round((endDate - startDate) / 86400000);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          mb: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${itinerary.city.imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundColor: 'common.black',
        }}
      >
        <Typography color="#fff" align="center" variant="h2">
          {itinerary.name}
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <h2>Trip Timeline</h2>
                <BasicTimeline
                  activities={itinerary.activities}
                  city={itinerary.city}
                  tripDuration={tripDuration}
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                {destinations.length > 0 ? (
                  <MapWithMarkers destinations={destinations}/>
                ) : (
                  <h3>Loading...</h3>
                )}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ marginBottom: 1 }}>
                <Box sx={{ marginBottom: '16px' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ display: 'block', width: '100%' }}
                  >
                    Add to MyTrips
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
              <ActivityList activitiesArr={itinerary.activities}/>
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleItinerary;
