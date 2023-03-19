import * as React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

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
    <Typography
      component='footer'
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 2, display: 'flex' }}>
        <Grid container spacing={4} justifyContent='center' alignItems='center'>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              spacing={0}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

// import TextField from '../components/TextField';
//
// const LANGUAGES = [
//   {
//     code: 'en-US',
//     name: 'English',
//   },
//   {
//     code: 'fr-FR',
//     name: 'Français',
//   },
//   {
//     code: 'es-ES',
//     name: 'Español',
//   },
//   {
//     code: 'de-DE',
//     name: 'Deutsch',
//   },
//   {
//     code: 'zh-CN',
//     name: '中文',
//   },
//   {
//     code: 'ja-JP',
//     name: '日本語',
//   },
// ];

// <Grid item xs={6} sm={8} md={4}>
// <TextField
//   select
//   size='small'
//   variant='standard'
//   SelectProps={{
//     native: true,
//   }}
//   sx={{ mt: 1, width: 150 }}
// >
//   {LANGUAGES.map((language) => (
//     <option value={language.code} key={language.code}>
//       {language.name}
//     </option>
//   ))}
// </TextField>
// </Grid>
