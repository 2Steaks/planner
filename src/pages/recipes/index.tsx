/** @format */

import React, { FunctionComponent } from 'react';
import { PrivateLayout, Recipes } from '@project/components';

const RecipesPage: FunctionComponent = () => {
  return (
    <PrivateLayout>
      <Recipes />
    </PrivateLayout>
  );
};

export default RecipesPage;
