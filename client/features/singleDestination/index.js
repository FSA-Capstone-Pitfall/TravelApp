import * as React from 'react';
import AppFooter from '../../components/LandingPage/modules/views/AppFooter';
import AppAppBar from '../../components/LandingPage/modules/views/AppAppBar';
import withRoot from '../../components/LandingPage/modules/withRoot';
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

export default withRoot(Index);
