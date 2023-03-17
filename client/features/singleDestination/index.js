import * as React from 'react';
import AppFooter from '../../components/LandingPage/modules/views/AuthDialog';
import AppAppBar from '../../components/LandingPage/modules/views/AppAppBar';
import SingleDestination from './singleDestination';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <SingleDestination />
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;
