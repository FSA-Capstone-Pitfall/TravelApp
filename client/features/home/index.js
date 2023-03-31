import * as React from 'react';
import {
  ProductCategories,
  ProductHero,
  ProductValues,
  ProductCTA,
  AboutTheSite,
} from './components';

function HomePage() {
  return (
    <React.Fragment>
      <ProductHero />
      <AboutTheSite />
      <ProductValues />
    </React.Fragment>
  );
}

export default HomePage;
