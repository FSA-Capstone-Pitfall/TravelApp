import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { useSelector } from 'react-redux';

const backgroundImages = [
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1572402554573-3380b6197404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
  'https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
  'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
];

const rdmIdx = Math.floor(Math.random() * backgroundImages.length);
const displayPic = backgroundImages[rdmIdx];

export default function ProductHero() {
  const user = useSelector((state) => state.auth.user);

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${displayPic})`,

        backgroundPosition: 'center',
      }}
    >
      {!user ? (
        <>
          <img
            style={{ display: 'none' }}
            src={displayPic}
            alt='increase priority'
          />
          <Typography
            color='inherit'
            align='center'
            variant='h2'
            marked='center'
          >
            Your Personal Travel Concierge
          </Typography>
          <Typography
            color='inherit'
            align='center'
            variant='h5'
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
          >
            Experience your next destination with personalized itineraries
            crafted by local experts.
          </Typography>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            component='a'
            href='/sign-up'
            sx={{ minWidth: 200 }}
          >
            Register
          </Button>
          <Typography variant='body2' color='inherit' sx={{ mt: 2 }}>
            Discover the experience
          </Typography>
        </>
      ) : (
        <>
          <img
            style={{ display: 'none' }}
            src={displayPic}
            alt='increase priority'
          />
          <Typography
            color='inherit'
            align='center'
            variant='h2'
            marked='center'
          >
            {`Your Next Destination Awaits ${user.firstName}`}
          </Typography>
          <Typography
            color='inherit'
            align='center'
            variant='h5'
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
          >
            Get your itinerary now and explore as the locals do.
          </Typography>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            component='a'
            href={`/destinations`}
            sx={{ minWidth: 200 }}
          >
            Destinations
          </Button>
        </>
      )}
    </ProductHeroLayout>
  );
}
