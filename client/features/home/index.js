import * as React from 'react';
import { ProductHero, AboutTheSite } from './components';

function HomePage() {
  return (
    <React.Fragment>
      <ProductHero />
      <AboutTheSite />
    </React.Fragment>
  );
}

export default HomePage;
