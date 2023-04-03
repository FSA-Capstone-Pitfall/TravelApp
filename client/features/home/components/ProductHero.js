import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// add your video paths here
const backgroundVideos = [
  '/assets/videos/granny.mp4',
  // '/assets/videos/home3.mp4',
  // '/assets/videos/home4.mp4',
  // '/assets/videos/home5.mp4',
  // '/assets/videos/home7.mp4',
  // '/assets/videos/video1.mp4',
  // '/assets/videos/video2.mp4',
  // '/assets/videos/video4.mp4',
  // '/assets/videos/video.mp4',
  // '/assets/videos/mov1.mp4',
  // '/assets/videos/mov2.mp4',
  // '/assets/videos/mov3.mp4',
  // '/assets/videos/mov4.mp4',
  // '/assets/videos/mov5.mp4',
  // '/assets/videos/mov6.mp4',
  // '/assets/videos/mov7.mp4',
  // '/assets/videos/mov8.mp4',
  // '/assets/videos/mov9.mp4',
];

const rdmIdx = Math.floor(Math.random() * backgroundVideos.length);
const displayVideo = backgroundVideos[rdmIdx];

// const displayPic =
//   'https://justinkelefas.com/wp-content/uploads/2022/04/New-York-City-Sunset-sample-2.jpg';

const videoProps = {
  src: displayVideo,
  alt: 'increase priority',
  autoPlay: true,
  muted: true,
  loop: true,
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
};

const ExploreButton = ({ text }) => (
  <Button
    color='secondary'
    variant='contained'
    size='medium'
    component='a'
    href={`/destinations`}
    sx={{ minWidth: 250, fontSize: text === 'Explore' ? '2rem' : '2rem' }}
  >
    {text}
  </Button>
);

const ProductHeroWrapper = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '115vh',
    minHeight: 500,
    maxHeight: 1800,
  },
}));

const ProductHero = () => {
  const user = useSelector((state) => state.auth.user);
  const isUserLoggedIn = Boolean(user);

  return (
    <ProductHeroWrapper>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <video {...videoProps} />
        <Typography
          color='inherit'
          align='center'
          variant='h2'
          marked={isUserLoggedIn ? 'center' : undefined}
        >
          {isUserLoggedIn
            ? `Your next destination awaits, ${user.firstName}`
            : 'Be apart of the travel movement'}
        </Typography>
        <Typography
          color='inherit'
          align='center'
          variant='h5'
          sx={{ mb: 10, mt: { xs: 2, sm: 4 } }}
        >
          {isUserLoggedIn
            ? 'Get your itinerary now and explore as the locals do.'
            : 'Experience your next destination with personalized itineraries crafted by local experts.'}
        </Typography>
        <ExploreButton text={isUserLoggedIn ? 'Destinations' : 'Explore'} />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.2,
            zIndex: -1,
            height: '97%',
          }}
        />
      </Container>
    </ProductHeroWrapper>
  );
};

export default ProductHero;
