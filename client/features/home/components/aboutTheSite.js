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
              delay: Math.floor(index / 2) * 1400 + (index % 2) * 700,
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
          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[0] = el)}>
              <img
                src='https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg'
                alt='Site information'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[1] = el)}>
              <Typography
                color='secondary'
                variant='h3'
                sx={{ mb: 2, letterSpacing: 1 }}
                gutterBottom
              >
                TRAVEL LIKE A LOCAL{' '}
              </Typography>
              <Typography variant='h5' sx={{ textAlign: 'left' }}>
                Say goodbye to overwhelming trip planning and generic travel
                suggestions! Our platform connects you to travel itineraries
                handcrafted by local experts, fostering authentic connections
                between travelers and locals to offer a personalized experience
                in every city you visit.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[2] = el)}>
              <Typography
                color='secondary'
                variant='h3'
                sx={{ mb: 2, letterSpacing: 1 }}
                gutterBottom
              >
                TRACK YOUR ADVENTURES{' '}
              </Typography>
              <Typography variant='h5' sx={{ mb: 2, textAlign: 'left' }}>
                Design and customize itineraries on our user-friendly platform,
                where you can easily modify activities, switch between cities,
                and fine-tune schedules to match your preferences. Pathfinder's
                My Trips section allows you to manage your trips and access
                itineraries with a single click.
              </Typography>
              <Link to='/destinations' style={{ textDecoration: 'none' }}>
                <Button variant='contained' size='large' sx={{ mb: 2 }}>
                  Explore Destinations
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[3] = el)}>
              <img
                src='https://images.pexels.com/photos/4529063/pexels-photo-4529063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt='Site information'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[4] = el)}>
              <img
                src='https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt='Site information'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ mb: 20 }}>
            <Box ref={(el) => (itemRefs.current[5] = el)}>
              <Typography
                color='secondary'
                variant='h3'
                sx={{ mb: 2, letterSpacing: 1 }}
                gutterBottom
              >
                ENDLESS DISCOVERY AWAITS{' '}
              </Typography>
              <Typography variant='h5' sx={{ textAlign: 'left' }}>
                Discover the unknown on our Explore page, where you'll find new
                cities and itineraries waiting to be experienced. Draw
                inspiration from other users' profiles and access the journeys
                they've crafted. Pathfinder is your key to unlocking a world of
                new experiences.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default InformationSection;
