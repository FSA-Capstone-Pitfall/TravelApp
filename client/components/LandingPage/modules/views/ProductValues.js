import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
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
            anime({
              targets: item,
              translateY: [100, 0],
              opacity: [0, 1],
              easing: 'easeOutExpo',
              delay: index * 500,
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
    <Box
      component='section'
      sx={{
        display: 'flex',
        overflow: 'hidden',
        bgcolor: 'secondary.light',
        mt: '0vh',
      }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component='img'
          src='https://gitlab.create-ion.at/lt/material-ui/-/raw/v4.0.2/static/themes/onepirate/productCurvyLines.png'
          alt='curvy lines'
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box ref={(el) => (itemRefs.current[0] = el)} sx={item}>
              <Avatar
                alt='Locals'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                sx={{ width: 200, height: 200 }}
              />
              <Typography variant='h6' sx={{ my: 5 }}>
                Local Experts
              </Typography>
              <Typography variant='h5'>
                {
                  'Our travel app connects you with trusted locals who have personally experienced the best spots in town with their own families and friends.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box ref={(el) => (itemRefs.current[1] = el)} sx={item}>
              <Avatar
                alt='Experiences'
                src='https://images.unsplash.com/photo-1551027654-f7b9f56804c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                sx={{ width: 200, height: 200 }}
              />
              <Typography variant='h6' sx={{ my: 5 }}>
                New Experiences
              </Typography>
              <Typography variant='h5'>
                {'Travel is all about discovering new experiences.'}

                {
                  'Discover the hidden gems of your destination and create unforgettable memories.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box ref={(el) => (itemRefs.current[2] = el)} sx={item}>
              <Avatar
                alt='Exclusive'
                src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80'
                sx={{ width: 200, height: 200 }}
              />
              <Typography variant='h6' sx={{ my: 5 }}>
                Exclusive Itineraries
              </Typography>
              <Typography variant='h5'>
                {
                  "By registering, you will you'll gain access to exclusive itineraries"
                }
                {' tailored to your interests and preferences.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
