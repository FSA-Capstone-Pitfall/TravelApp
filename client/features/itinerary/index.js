import * as React from 'react';
import AppFooter from '../../components/LandingPage/modules/views/AppFooter';
import AppAppBar from '../../components/LandingPage/modules/views/AppAppBar';
import MyTrip from './myTrip';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <MyTrip />
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;
