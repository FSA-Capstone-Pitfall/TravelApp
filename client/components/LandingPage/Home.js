import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductCTA from './modules/views/ProductCTA';

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductCTA />
    </React.Fragment>
  );
}

export default Index;
