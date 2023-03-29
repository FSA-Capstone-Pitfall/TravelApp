import React from 'react';
import Router from './Router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AppFooter from './features/home/components/AppFooter';
import AppAppBar from './features/home/components/AppAppBar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.main} 68px, white 68px)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AppAppBar />
        <Router />
        <AppFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
