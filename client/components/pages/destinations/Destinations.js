import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Container, List, ListItemButton, Typography } from '@mui/material';
import { fetchDestinations } from '../../../store';

const Destinations = () => {
  const { state: { searchValue } } = useLocation();
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations.destinations);

  useEffect(() => {
    dispatch(fetchDestinations({ identifier: searchValue }));
  }, [dispatch]);

  if (!destinations) return null;

  return (
    <Box
      component="section"
      style={{ backgroundColor: 'grey' }}
    >
      <Container maxWidth="md" sx={{ padding: '10rem' }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {searchValue}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Step off the beaten path and immerse yourself in the culture. Taste
          the flavors of the city, hear its stories, and explore its hidden
          corners. You'll discover a new way of seeing the world, one that is
          tailored to your interests and will leave you with memories to last
          a lifetime.
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <List component="nav" aria-label="main mailbox folders">
          {destinations.map(city => <List key={city.id}>
            <ListItemButton>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                {city.name}
              </Typography>
            </ListItemButton>
            <List component="nav" style={{ marginLeft: '2rem' }}>
              {city.destinations.map(destination =>
                <ListItemButton key={destination.id}>
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                  >
                    {destination.name}
                  </Typography>
                </ListItemButton>)}
            </List>
          </List>)}
        </List>
      </Container>
    </Box>
  );
};

export default Destinations;
