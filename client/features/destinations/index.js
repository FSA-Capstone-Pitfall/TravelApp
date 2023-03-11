import * as React from 'react';
import AppFooter from '../../components/LandingPage/modules/views/AppFooter';
import AppAppBar from '../../components/LandingPage/modules/views/AppAppBar';
import withRoot from '../../components/LandingPage/modules/withRoot';
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

export default withRoot(Index);
