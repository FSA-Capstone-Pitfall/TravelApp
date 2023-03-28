import * as React from 'react';
import {
  ProductCategories,
  ProductHero,
  ProductValues,
  ProductCTA,
} from './components';

function HomePage() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductCTA />
    </React.Fragment>
  );
}

export default HomePage;
