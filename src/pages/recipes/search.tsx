/** @format */

import React, { FunctionComponent } from 'react';
import { useAuth } from '@project/context';
import { PrivateLayout, PublicLayout, RecipeSearch } from '@project/components';

const RecipesPage: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <RecipeSearch />
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <RecipeSearch />
    </PrivateLayout>
  );
};

export default RecipesPage;
