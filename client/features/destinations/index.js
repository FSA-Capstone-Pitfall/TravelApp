import * as React from 'react';
import AppFooter from '../../components/LandingPage/modules/views/AuthDialog';
import AppAppBar from '../../components/LandingPage/modules/views/AppAppBar';
import Destination from './destinations';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Destination />
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;
