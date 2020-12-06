/** @format */

import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import {
  Login,
  PrivateLayout,
  PublicLayout,
  Recipe
} from '@project/components';

const RecipePage: FunctionComponent = () => {
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
      <Recipe />
    </PrivateLayout>
  );
};

export default RecipePage;
