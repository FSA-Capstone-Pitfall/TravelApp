import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function InformationSection() {
  const itemRefs = useRef([]);
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          itemRefs.current.forEach((item, index) => {
            const translateDirection = index % 2 === 0 ? -100 : 100;
            anime({
              targets: item,
              translateX: [translateDirection, 0],
              opacity: [0, 1],
              easing: 'easeOutExpo',
              delay: Math.floor(index / 2) * 2200 + (index % 2) * 1200,
            });
          });
          observer.current.disconnect();
        }
      });
    }, options);

    itemRefs.current.forEach((item) => {
      observer.current.observe(item);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Box
        component='section'
        sx={{
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'primary',
          mt: '0vh',
          mb: 25,
        }}
      >
        <Container
          sx={{ mt: 15, mb: 20, display: 'flex', position: 'relative' }}
        >
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={12} md={7}>
              <Box ref={(el) => (itemRefs.current[0] = el)}>
                <Typography variant='h3' gutterBottom>
                  LOCAL EXPERTS
                </Typography>
                <Typography variant='h5'>
                  Our travel app connects you with trusted locals who have
                  personally experienced the best spots in town with their own
                  families and friends.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box ref={(el) => (itemRefs.current[1] = el)}>
                <img
                  src='https://images.unsplash.com/photo-1621112904887-419379ce6824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80'
                  alt='Site information'
                  style={{
                    width: '165%',
                    height: 'auto',
                    objectFit: 'cover',
                    aspectRatio: '3/4',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component='section'
        sx={{
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'primary',
          mt: '0vh',
          mb: 25,
        }}
      >
        <Container
          sx={{ mt: 15, mb: 20, display: 'flex', position: 'relative' }}
        >
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={12} md={5}>
              <Box ref={(el) => (itemRefs.current[2] = el)}>
                <img
                  src='https://images.unsplash.com/photo-1621112904887-419379ce6824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80'
                  alt='Site information'
                  style={{
                    width: '165%',
                    height: 'auto',
                    objectFit: 'cover',
                    aspectRatio: '3/4',
                    marginLeft: '-70%',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box ref={(el) => (itemRefs.current[3] = el)}>
                <Typography variant='h3' gutterBottom>
                  NEW EXPERIENCES
                </Typography>
                <Typography variant='h5'>
                  Travel is all about discovering new experiences.Discover the
                  hidden gems of your destination and create unforgettable
                  memories.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component='section'
        sx={{
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'primary',
          mt: '0vh',
          mb: 25,
        }}
      >
        <Container
          sx={{ mt: 15, mb: 20, display: 'flex', position: 'relative' }}
        >
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={12} md={7}>
              <Box ref={(el) => (itemRefs.current[4] = el)}>
                <Typography variant='h3' gutterBottom>
                  EXPAND YOUR HORIZONS
                </Typography>
                <Typography variant='h5'>
                  Browse cities and itineraries to find the excitement you never
                  knew you were looking for.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box ref={(el) => (itemRefs.current[5] = el)}>
                <img
                  src='https://images.unsplash.com/photo-1621112904887-419379ce6824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80'
                  alt='Site information'
                  style={{
                    width: '165%',
                    height: 'auto',
                    objectFit: 'cover',
                    aspectRatio: '3/4',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default InformationSection;
