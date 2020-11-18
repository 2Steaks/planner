/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { Home, PrivateLayout } from '@project/components';

const HomePage: FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Home />
    </PrivateLayout>
  );
};

export default HomePage;
