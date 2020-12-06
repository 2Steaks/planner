/** @format */

import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import {
  Login,
  PrivateLayout,
  PublicLayout,
  Recipes
} from '@project/components';

const RecipesPage: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <Login />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <Recipes />
    </PrivateLayout>
  );
};

export default RecipesPage;
