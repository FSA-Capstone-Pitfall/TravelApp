import * as React from 'react';
import { ProductHero, AboutTheSite } from './components';

function HomePage() {
  return (
    <React.Fragment>
      <ProductHero />
      <AboutTheSite />
      <ProductCTA />
      <ProductValues />
    </React.Fragment>
  );
}

export default HomePage;
