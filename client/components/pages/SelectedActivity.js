import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import { fetchSingleActivity } from '../../store';
import MapWithMarkers from '../../features/itinerary/components/map/map';


const SelectedActivity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activities.selectedActivity);


  useEffect(() => {
    dispatch(fetchSingleActivity(activityId));
  }, [activityId]);

  if (!activity.id) return null;

  const [lat, lng] = activity.googleMap.split(',').map(c => parseFloat(c));

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
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
          overflow: 'hidden',
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
      </Box>
      <Box>
        <Typography color="black" align="center" variant="h5"
                    sx={{ mb: 4 }}
                    style={
                      { fontWeight: 'regular' }
                    }>
          Suggested duration {activity.duration} minutes
        </Typography>
        <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {activity ? (
            MapWithMarkers([{ lat, lng }])
          ) : (
            <h3 style={{ color: 'black' }}>No activities found.</h3>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default SelectedActivity;