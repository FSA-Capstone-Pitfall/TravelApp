import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
              delay: Math.floor(index / 2) * 2000 + (index % 2) * 1000,
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
      <Box sx={{ flexGrow: 1, padding: { lg: 45, xs: 5 } }}>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Item>
              <Box ref={(el) => (itemRefs.current[0] = el)}>
                <Typography variant='h3' gutterBottom>
                  TRIPS FROM LOCAL EXPERTS
                </Typography>
                <Typography variant='h5' sx={{ textAlign: 'left' }}>
                  Our travel app connects you with trusted locals who have
                  personally experienced the best spots in town with their own
                  families and friends.
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Item>
              <Box
                ref={(el) => (itemRefs.current[1] = el)}
                sx={{ overflow: 'hidden' }}
              >
                <img
                  src='https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg'
                  alt='Site information'
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '8/12',
                  }}
                />
              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Item>
              <Box ref={(el) => (itemRefs.current[2] = el)}>
                <img
                  src='https://images.unsplash.com/photo-1623556710453-d76c4ea26d1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                  alt='Site information'
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '8/12',
                  }}
                />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Item>
              <Box ref={(el) => (itemRefs.current[3] = el)}>
                <Typography variant='h3' gutterBottom>
                  NEW EXPERIENCES
                </Typography>
                <Typography variant='h5' sx={{ mb: 2, textAlign: 'left' }}>
                  Travel is all about uncovering new experiences and hidden gems
                  to create lasting memories. Dive into the heart of your
                  destination, exploring its unique character and charm as if
                  you were a local, embracing the genuine spirit of each
                  adventure.
                </Typography>
                <Link to='/destinations' style={{ textDecoration: 'none' }}>
                  <Button variant='contained' size='large' sx={{ mb: 2 }}>
                    Explore Destinations
                  </Button>
                </Link>
              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Item>
              <Box ref={(el) => (itemRefs.current[4] = el)}>
                <Typography variant='h3' gutterBottom>
                  EXPAND YOUR HORIZONS
                </Typography>
                <Typography variant='h5' sx={{ textAlign: 'left' }}>
                  Browse cities and itineraries to find the excitement you never
                  knew you were looking for. Whether you're looking for
                  adventure, relaxation, or something in between, our travel app
                  has everything you need to plan your next trip with ease.
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Item>
              <Box ref={(el) => (itemRefs.current[5] = el)}>
                <img
                  src='https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                  alt='Site information'
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '8/12',
                  }}
                />
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default InformationSection;
