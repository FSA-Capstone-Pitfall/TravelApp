import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MapWithMarkers from '../components/map';
import BasicTimeline from '../myTrip/components/activityTimeline';
import ActivityList from '../myTrip/components/activityList';
import Button from '@mui/material/Button';
import { fetchItinerary } from '../../store';

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
  '& h3': {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '2rem',
  },
}));

const SingleItinerary = () => {
  const dispatch = useDispatch();
  const { itineraryId } = useParams();

  const itinerary = useSelector((state) => state.itineraries.itinerary);
  const user = useSelector((state) => state.auth.user);

  function comparePositions(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  }

  let activitiesArr;
  if (itinerary) {
    activitiesArr = [...itinerary.itinerary_activities];
    activitiesArr.sort(comparePositions);
    console.log(activitiesArr);
  }

  useEffect(() => {
    dispatch(fetchItinerary({ itineraryId }));
  }, [dispatch, itineraryId]);

  const copyItinerary = async ({ itineraryId, userId }) => {
    try {
      const { data } = await axios.post(`/api/itineraries/${itineraryId}`, { userId });
      return data;
    } catch (err) {
      console.error("error adding my itinerary: ", err)
    }
  };

  if (!itinerary) return null;

  let destinations = itinerary.itinerary_activities.map((activity) => {
    const coordinates = activity.activity.googleMap.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1]),
    };
  });

  let tripDuration = 0;
  if (
    itinerary.activities &&
    itinerary.itinerary_activities.activities.length > 0
  ) {
    const startDate = new Date(
      itinerary.itinerary_activities.activities[0].date
    );
    const endDate = new Date(
      itinerary.itinerary_activities.activities[
      itinerary.itinerary_activities.activities.length - 1
        ].date
    );
    tripDuration = Math.round((endDate - startDate) / 86400000);
  }

  return (
    <>
      <PictureBox sx={{ flexGrow: 1, marginBottom: 3, minHeight: '650px' }}>
        {itinerary.city ? (
          <>
            <img src={itinerary.city.imageUrl} alt="Full-width"/>
            <h1>{itinerary.name}</h1>
            <h3>{itinerary.city.name}</h3>
          </>
        ) : (
          <h3>Add activity to see details</h3>
        )}
      </PictureBox>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ display: 'flex' }}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  <h2>Trip Timeline</h2>
                  <BasicTimeline
                    activities={itinerary.itinerary_activities}
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
              {user && user.id !== itinerary.authorId && <Grid item xs={6}>
                <Item sx={{ marginBottom: 1 }}>
                  <Box sx={{ marginBottom: '16px' }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ display: 'block', width: '100%' }}
                      onClick={async () => await copyItinerary({ itineraryId, userId: user.id })}
                    >
                      Add to MyTrips
                    </Button>
                  </Box>
                </Item>
              </Grid>}
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'left' }}>
            <Box sx={{ maxHeight: '1200px', overflowY: 'auto', flex: 1 }}>
              <Item>
                <h2>Trip Details</h2>
                <ActivityList activitiesArr={activitiesArr}/>
              </Item>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SingleItinerary;