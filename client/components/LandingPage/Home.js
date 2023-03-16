import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <AppAppBar />
      <ProductValues />
      <ProductCategories />
      <ProductCTA />
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;
