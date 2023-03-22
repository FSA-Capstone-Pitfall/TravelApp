import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, List, Pagination, Typography } from '@mui/material';
import { fetchActivities } from '../store';
import MapWithMarkers from '../features/itinerary/components/map/map';

const Activities = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(1);

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
        page: currPage,
        limit: 5
      }));
    }
  }, [dispatch, destinationId, cityId, currPage]);

  useEffect(() => {
    if (!totalPages && activities.totalPages) {
      setTotalPages(activities.totalPages);
    }
  }, [activities]);

  if (!activities.data) return null;

  const destinations = activities.data.map(activity => {
    const coordinates = activity.googleMap.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1]),
    };
  });

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
      <Container maxWidth="lg" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {activities.data && <List
          component="nav"
          sx={{ mb: 5 }}
        >
          {activities.data.map(activity => (
              <Typography key={activity.id}>
                {activity.name}
              </Typography>
            ),
          )}
        </List>}
        <Pagination sx={{ mb: 10 }} count={totalPages} page={currPage} onChange={(event, value) => setCurrPage(value)}/>
        {destinations.length > 0 ? (
          MapWithMarkers(destinations)
        ) : (
          <h3 style={{ color: 'black' }}>Loading...</h3>
        )}
      </Container>
    </Box>
  );
};
export default Activities;