/** @format */

// pages/index.js
import React, { FunctionComponent } from 'react';
import { RecipeType } from '@project/types/Recipe';
import { GridColumn, RecipeArticle } from '@project/components';

/**
 *
 *
 * @returns
 */
export const Recipe: FunctionComponent<RecipeType> = ({
  id,
  ...props
}: RecipeType) => {
  return (
    <GridColumn key={id} xs={12} sm={6} md={3} tag="article">
      <RecipeArticle id={id} {...props} />
    </GridColumn>
  );
};
