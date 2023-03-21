import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, List, Typography } from '@mui/material';
import { fetchActivities } from '../store';

const Activities = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const {
    destinationId,
    cityId,
    displayName,
    description,
    imageUrl,
    googleMap,
  } = state;

  const activities = useSelector((state) => state.activities.activities);

  useEffect(() => {
    if (destinationId || cityId) {
      dispatch(fetchActivities({
        destinationId,
        cityId,
      }));
    }
  }, [dispatch, destinationId, cityId]);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          mb: 15,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundColor: 'common.black',
        }}
      >
        <Typography color="#fff" align="center" variant="h2">
          {displayName}
        </Typography>
        {description && <Typography
          color="#fff"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
          {description}
        </Typography>}
      </Box>
      <Container maxWidth="lg">
        {activities.data && <List component="nav" aria-label="main mailbox folders">
          {activities.data.map(activity => (
              <Typography key={activity.id}>
                {activity.name}
              </Typography>
            ),
          )}
        </List>}
      </Container>
    </Box>
  );
};
export default Activities;