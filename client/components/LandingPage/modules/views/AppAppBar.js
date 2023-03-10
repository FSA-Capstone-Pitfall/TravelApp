import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ResponsiveAppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
  textTransform: 'none',
};

function AppAppBar() {
  return (
    <div>
      <ResponsiveAppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            href='/premium-themes/onepirate/'
            sx={{ fontSize: 24, textTransform: 'none' }}
          >
            {'Roam Free'}
          </Link>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              textTransform: 'none',
            }}
          >
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              href='/premium-themes/onepirate/sign-in/'
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              variant='h6'
              underline='none'
              href='/premium-themes/onepirate/sign-up/'
              sx={{
                ...rightLink,
                color: 'secondary.main',
                textTransform: 'none',
              }}
            >
              {'Sign Up'}
            </Link>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              href='/premium-themes/onepirate/sign-in/'
              sx={rightLink}
            >
              {'Destinations'}
            </Link>
          </Box>
        </Toolbar>
      </ResponsiveAppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
