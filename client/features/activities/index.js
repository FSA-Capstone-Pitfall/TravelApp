import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  List,
  ListItemButton,
  Pagination,
  Typography,
} from '@mui/material';
import { Filters, Map } from '../components';
import { capital, snake } from 'case';

import { fetchActivities, fetchItineraries } from '../../store';

const hardcodedCategories = [
  'amusement_park',
  'beach',
  'entertainment',
  'landmark',
  'museum',
  'nature',
  'park',
  'show',
  'sports',
  'transportation',
].map((category) => capital(category));

const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [categories, setCategories] = useState([]);
  const [totalPagesActivities, setTotalPagesActivities] = useState(0);
  const [currPageActivities, setCurrPageActivities] = useState(1);
  const [totalPagesItins, setTotalPagesItins] = useState(0);
  const [currPageItins, setCurrPageItins] = useState(1);

  const {
    destinationId,
    cityId,
    displayName,
    description,
    imageUrl,
    googleMap,
  } = state;

  const activities = useSelector((state) => state.activities.activities);
  const itineraries = useSelector((state) => state.itineraries.itineraries);

  useEffect(() => {
    if (destinationId || cityId) {
      dispatch(
        fetchActivities({
          destinationId,
          cityId,
          page: currPageActivities,
          categories: categories.map((category) => snake(category)),
          limit: 6,
        })
      );
    }
  }, [dispatch, destinationId, cityId, currPageActivities, categories]);

  useEffect(() => {
    if (cityId) {
      dispatch(
        fetchItineraries({
          cityId,
          page: currPageItins,
          limit: 3,
        })
      );
    }
  }, [dispatch, currPageItins, cityId]);

  useEffect(() => {
    if (activities.data) {
      setTotalPagesActivities(activities.totalPages);
    }
  }, [activities]);

  useEffect(() => {
    if (itineraries && itineraries.data) {
      setTotalPagesItins(itineraries.totalPages);
    }
  }, [itineraries]);

  if (!activities || !activities.data) return null;

  const destinations = activities.data.map((activity) => {
    const coordinates = activity.googleMap.split(',');
    return {
      lat: parseFloat(coordinates[0]),
      lng: parseFloat(coordinates[1]),
    };
  });

  return (
    <Box
      component='section'
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
          height: '50rem',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundColor: 'common.black',
        }}
      >
        <Typography color='#fff' align='center' variant='h2'>
          {displayName}
        </Typography>
        {description && (
          <Typography
            color='#fff'
            align='center'
            variant='h5'
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
          >
            {description}
          </Typography>
        )}
      </Box>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 10,
        }}
      >
        <Typography
          color='black'
          align='center'
          variant='h4'
          sx={{ mb: 4 }}
          style={{ fontWeight: 'regular' }}
        >
          Things to do in {displayName}
        </Typography>
        <Filters
          label={'Filter'}
          placeholder={'Categories'}
          options={hardcodedCategories}
          onChange={(selectedCategories) => {
            setCategories(selectedCategories);
            setCurrPageActivities(1);
          }}
        />
        {activities.data && (
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 1fr))',
              gridGap: '1rem',
              width: '100%',
            }}
          >
            {activities.data.map((activity) => (
              <ListItemButton
                key={activity.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  height: '20rem',
                  boxSizing: 'border-box',
                }}
                onClick={() => navigate(`/activities/${activity.id}`)}
              >
                <img
                  src={activity.imageUrl}
                  loading='lazy'
                  alt='blank'
                  style={{
                    maxWidth: '100%',
                    height: '80%',
                  }}
                />
                <Typography variant='h5' align={'center'}>
                  {activity.name}
                </Typography>
              </ListItemButton>
            ))}
          </List>
        )}
        {totalPagesActivities && (
          <Pagination
            id='activities-pagination'
            sx={{ mb: 10 }}
            count={totalPagesActivities}
            page={currPageActivities}
            onChange={(event, value) => setCurrPageActivities(value)}
          />
        )}
        {destinations.length > 0 ? (
          <Map destinations={destinations} />
        ) : (
          <h3 style={{ color: 'black' }}>
            No activities found by selected categories.
          </h3>
        )}
      </Container>
      {cityId && itineraries && (
        <Container
          maxWidth='lg'
          sx={{
            mb: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            color='black'
            align='center'
            variant='h4'
            sx={{ mb: 4 }}
            style={{ fontWeight: 'regular' }}
          >
            Trips by local experts
          </Typography>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 1fr))',
              gridGap: '1rem',
              width: '100%',
            }}
          >
            {itineraries.data.map((itinerary) => (
              <ListItemButton
                key={itinerary.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  height: '20rem',
                  boxSizing: 'border-box',
                }}
                onClick={() => navigate(`/itineraries/${itinerary.id}`)}
              >
                <Typography variant='h5' align={'center'}>
                  {itinerary.name}
                </Typography>
                <img
                  src={itinerary.imageUrl}
                  loading='lazy'
                  alt='blank'
                  style={{
                    maxWidth: '100%',
                    height: '80%',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          {totalPagesItins && (
            <Pagination
              id='itineraries-pagination'
              sx={{ mb: 10 }}
              count={totalPagesItins}
              page={currPageItins}
              onChange={(event, value) => setCurrPageItins(value)}
            />
          )}
        </Container>
      )}
    </Box>
  );
};
export default Activities;
