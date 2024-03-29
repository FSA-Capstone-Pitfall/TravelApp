import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Box, Container, List, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { fetchDestinations } from '../../store';

const displayPic =
  'https://images.unsplash.com/photo-1669733040274-1e3c13e731db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3271&q=80';

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cities = useSelector((state) => state.destinations.destinations);

  useEffect(() => {
    dispatch(fetchDestinations({}));
  }, [dispatch]);

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${displayPic})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          backgroundColor: 'common.black',
        }}
      >
        <Typography color='#fff' align='center' variant='h2'>
          Top destinations
        </Typography>
      </Box>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          color='black'
          align='center'
          variant='h5'
          sx={{ mb: 4 }}
          style={{ fontWeight: 'regular' }}
        >
          Spots at the top of travelers’ must-go lists
        </Typography>

        <List
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(25%, 1fr))',
            gridGap: '1rem',
            width: '100%',
          }}
        >
          {cities.map((city) => (
            <ListItemButton
              key={city.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '20rem',
                boxSizing: 'border-box',
              }}
              onClick={() =>
                navigate('/activities', {
                  state: {
                    cityId: city.id,
                    displayName: city.name,
                    imageUrl: city.imageUrl,
                  },
                })
              }
            >
              <img
                src={city.imageUrl}
                loading='lazy'
                style={{
                  maxWidth: '100%',
                  height: '80%',
                }}
              />
              <Typography variant='h5' align={'center'}>
                {city.name}, {city.state}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default Explore;
