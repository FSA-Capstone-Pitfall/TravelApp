import * as React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Paper from '@mui/material/Paper';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color='inherit' href='http://localhost:8404/'>
        Pathfinder
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Paper
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        marginTop: 'calc(10% + 60px)',
        backgroundColor: 'transparent',
      }}
      component='footer'
      square
    >
      <Typography
        component='footer'
        sx={{ display: 'flex', bgcolor: 'transparent' }}
      >
        <Container sx={{ display: 'flex' }}>
          <Grid
            container
            spacing={4}
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                justifyContent='center'
                alignItems='center'
                spacing={0}
              >
                <Grid item>
                  <Typography variant='caption'>
                    <Copyright />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </Paper>
  );
}
