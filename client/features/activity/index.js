import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, ClickAwayListener, Container, List, ListItemButton, Paper, Typography } from '@mui/material';

import { fetchSingleActivity } from '../../store';
import { Map } from '../components';
import axios from 'axios';

const Activity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activity = useSelector((state) => state.activities.selectedActivity);
  const trips = useSelector((state) => state.trips.itineraries);
  const [showItinsList, setShowItinsList] = useState(false);
 

  useEffect(() => {
    dispatch(fetchSingleActivity(activityId));
  }, [activityId]);

  if (!activity.id) return null;

  const addActivity = async ({ itineraryId, activityId }) => {
    try {
      const { data } = await axios.put(`/api/itineraries/${itineraryId}`, {
        activityId,
      });
      return data;
    } catch (err) {
      console.error('error adding activity: ', err);
    }
  };

  const [lat, lng] = activity.googleMap.split(',').map((c) => parseFloat(c));

  let destinations = [];
  destinations.push({
    lat,
    lng,
  });

  let cityTrips;
  if (trips && trips.length) {
    cityTrips = trips.filter((trip) =>
      trip.status === 'planning'
    );
  }

  const handleClickAway = () => {
    setShowItinsList(false);
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        zIndex: 5
      }}
    >
      <Box
        sx={{
          mb: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${activity.imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'common.black',

        }}
      >
        <Typography color="#fff" align="center" variant="h2">
          {activity.name}
        </Typography>
        <Typography
          color="#fff"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
          {activity.description}
        </Typography>
        {cityTrips && cityTrips.length && <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ display: 'block', width: '100%', mb: 2 }}
            onClick={
              () => setShowItinsList(!showItinsList)
            }
          >Add to itinerary</Button>
          {showItinsList && <Paper style={{ position: 'absolute', width: '15rem' }}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <List component="nav" aria-label="main mailbox folders">
                {cityTrips.map((trip) => (
                  <List sx={{ align: 'center' }} key={trip.id}>
                    <ListItemButton key={trip.id}
                                    sx={{ height: '2rem', align: 'center', position: 'relative' }}
                                    onClick={async () => {
                                      await addActivity({ itineraryId: trip.itinerary.id, activityId: activity.id });
                                      setShowItinsList(false);
                                      navigate(`/mytrips/${trip.itinerary.id}`);
                                    }
                                    }
                    >
                      <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                      >

                        {trip.itinerary.name}
                      </Typography>
                    </ListItemButton>
                  </List>
                ))}
              </List>
            </ClickAwayListener>
          </Paper>}
        </Box>}
      </Box>
      <Box>
        <Typography
          color="black"
          align="center"
          variant="h5"
          sx={{ mb: 4 }}
          style={{ fontWeight: 'regular' }}
        >
          Suggested duration {activity.duration} minutes
        </Typography>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {activity ? (
            <Map destinations={destinations}/>
          ) : (
            <h3 style={{ color: 'black' }}>No activities found.</h3>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Activity;
