import React from 'react';
import Router from './Router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AppFooter from './components/LandingPage/modules/views/AppFooter';
import AppAppBar from './components/LandingPage/modules/views/AppAppBar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppAppBar/>
      <CssBaseline/>
      <Router/>
      <AppFooter/>
    </ThemeProvider>
  );
};

export default App;
