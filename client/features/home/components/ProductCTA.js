import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Button from './Button';
import { Link } from 'react-router-dom';
import SignupDialog from './SignupDialog';
import { useSelector } from 'react-redux';

function ProductCTA() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  let userId;
  if (user) {
    userId = user.id;
  }

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  const handleSignUpClick = () => {
    setIsLoginDialogOpen(true);
  };

  return (
    <Container component='section' sx={{ mt: 10, display: 'flex', mb: 30 }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#3D9970',
              py: 8,
              px: 3,
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography
                variant='h2'
                component='h2'
                gutterBottom
                sx={{ textTransform: 'none' }}
              >
                Get Ready, Jet-set, Go!
              </Typography>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Begin your adventure with us – sign up and join the travel
                collective.
              </Typography>
              {!user ? (
                <Button
                  type='button'
                  color='error'
                  variant='contained'
                  sx={{ width: '100%', mt: 2, mb: 2 }}
                  onClick={handleSignUpClick}
                >
                  <SignupDialog
                    color='inherit'
                    variant='h6'
                    underline='none'
                    open={isLoginDialogOpen}
                    onClose={handleCloseLoginDialog}
                  />
                </Button>
              ) : null}
              <Link to='/destinations' style={{ textDecoration: 'none' }}>
                <Button
                  type='button'
                  color='error'
                  variant='contained'
                  sx={{ width: '100%', mb: 2 }}
                >
                  Explore More First
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              left: -100,
              right: 0,
              bottom: 0,
              width: '100%',
            }}
          />
          <Box
            component='img'
            src='https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
            alt='call to action'
            sx={{
              position: 'absolute',
              top: -60,
              left: -40,
              right: 0,
              bottom: 0,
              width: '125%',
              zIndex: -5,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
