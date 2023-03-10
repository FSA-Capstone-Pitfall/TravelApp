import * as React from 'react';
import Button from './button';
import Typography from './typography';
import LandingPageLayout from './landingPageLayout';

const backgroundImage =
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

export default function LandingPage() {
  return (
    <LandingPageLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2' marked='center'>
        Upgrade your Sundays
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
      <Button
        color='secondary'
        variant='contained'
        size='large'
        component='a'
        href='/premium-themes/onepirate/sign-up/'
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant='body2' color='inherit' sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </LandingPageLayout>
  );
}
