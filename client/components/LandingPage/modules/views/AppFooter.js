import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color='inherit' href='http://localhost:8404/'>
        Roam Free
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
  {
    code: 'es-ES',
    name: 'Español',
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
  },
  {
    code: 'zh-CN',
    name: '中文',
  },
  {
    code: 'ja-JP',
    name: '日本語',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component='footer'
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction='column'
              justifyContent='flex-end'
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component='a' href='https://www.facebook.com/'>
                  <FacebookIcon fontSize='large' color='secondary' />
                </Box>
                <Box component='a' href='https://twitter.com/'>
                  <TwitterIcon fontSize='large' color='secondary' />
                </Box>
                <Box component='a' href='https://www.instagram.com/'>
                  <InstagramIcon fontSize='large' color='secondary' />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant='h6' marked='left' gutterBottom>
              Careers
            </Typography>
            <Box component='ul' sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component='li' sx={{ py: 0.5 }}>
                <Link href='http://localhost:8404/'>Software</Link>
              </Box>
              <Box component='li' sx={{ py: 0.5 }}>
                <Link href='http://localhost:8404/'>General</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant='h6' marked='left' gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size='medium'
              variant='standard'
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
