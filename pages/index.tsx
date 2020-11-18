/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { PrivateLayout, Recipes } from '@project/components';

const RecipesPage: FunctionComponent = () => (
  <PrivateLayout>
    <Recipes />
  </PrivateLayout>
);

export default RecipesPage;
