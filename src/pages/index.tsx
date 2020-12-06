/** @format */

import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import { Home, PrivateLayout, PublicLayout } from '@project/components';

const HomePage: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Home />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <Home />
    </PrivateLayout>
  );
};

export default HomePage;
